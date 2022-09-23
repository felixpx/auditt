import axios from "axios";
import {AuDiTTNFTAddress} from '../Contracts/AuDiTTNFT'

export const covalentGetTokenIds = async (contractAddress) =>{
   let data;     
     await axios.get(`https://api.covalenthq.com/v1/80001/tokens/${contractAddress}/nft_token_ids/`,
      {params:{"quote-currency":"USD",format:"JSON",key:`${process.env.NEXT_PUBLIC_COVALENT_KEY}`}})
      .then((tokens)=>{
         data = tokens.data.data.items;
      })

      return data;
}


export const covalentGetTokenMetadata = async (contractAddress,tokenId) =>{
    let data;     
      await axios.get(`https://api.covalenthq.com/v1/80001/tokens/${contractAddress}/nft_metadata/${tokenId}/`,
       {params:{"quote-currency":"USD",format:"JSON",key:`${process.env.NEXT_PUBLIC_COVALENT_KEY}`}})
       .then((tokens)=>{
          if(tokens.data.data.items[0]?.nft_data != undefined)
          data = {address:tokens.data.data.items[0].contract_address,symbol:tokens.data.data.items[0].contract_ticker_symbol,tokenId:tokenId,name:tokens.data.data.items[0].contract_name,metadata:tokens.data.data.items[0]?.nft_data[0]?.external_data};
       })
 
       return data;
 }


 export const covalentGetMetadataForContract = async (contractAddress) =>{
    const tokens = await covalentGetTokenIds(contractAddress);
    let metadata = [];
     tokens.forEach(async (token)=>{
        console.log(token.token_id);     
       if(token.token_id != undefined)
       { 
          const data = await covalentGetTokenMetadata(contractAddress,token.token_id);
          if(data != undefined)
          metadata.push(data);
       }   
     });
    return metadata;    
 }

 export const getUserAuDiTTNFT= async (walletAddress) =>{
    let data=[];     
    await axios.get(`https://api.covalenthq.com/v1/80001/address/${walletAddress}/balances_v2/`,
     {timeout:50000,params:{"quote-currency":"USD",format:"JSON",key:`${process.env.NEXT_PUBLIC_COVALENT_KEY}`,nft:true,"no-nft-fetch":false}})
     .then((tokens)=>{
        console.log({tokens})
        tokens.data.data.items.forEach((token)=>{
            if(token.contract_address == AuDiTTNFTAddress.toLowerCase() )
                data.push(token)
                console.log(token.contract_address)
        })
       // data = tokens.data.data.items;
     })

     return data;

    
 }

 export const createLivePeerStream = async (name) =>{
      const instance = axios.create({
        baseURL: 'https://livepeer.studio/api/stream',

        headers: {
          Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_LIVEPEER_API_KEY,
          'content-type': 'application/json',
        },
      })

      const result = await instance.post('/', {
        name: name,
        record: false,

        profiles: [
          {
            name: '720p',
            bitrate: 2000000,
            fps: 30,
            width: 1280,
            height: 720,
          },
          {
            name: '480p',
            bitrate: 1000000,
            fps: 30,
            width: 854,
            height: 480,
          },
          {
            name: '360p',
            bitrate: 500000,
            fps: 30,
            width: 640,
            height: 360,
          },
        ],
      })
return result;
     
}  