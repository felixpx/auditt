Moralis.Cloud.define("Metadata", async(request) => {
   
  const tokenId = request.params.tokenId;
  
  const NFT =  Moralis.Object.extend("AuDiTTNFT");
  const query = new Moralis.Query(NFT)
  query.equalTo("tokenId",parseInt(tokenId));
  const logger = Moralis.Cloud.getLogger();
  logger.info(`The Parameters from contract ${JSON.stringify(request)}`); 
  const result =  await query.first({useMasterKey:true});
  
  if(result) 
   return {
  "name":  result.get("name"),
  "description": "AuDiTT NFT", 
  "image": result.get("image"), 


  "attributes": [{
  "trait_type": "Value", 
  "value": result.get("value")},
    ]
}; else
	return {};

  
});


Moralis.Cloud.afterSave("TokenListed", async function(request) {
  const contractAddress = request.object.get("contractAddress");
  const seller = request.object.get("seller");
  const tokenId = parseInt(request.object.get("tokenId"));
  const pricePerToken = request.object.get("pricePerToken");
  const listingId = parseInt(request.object.get("listingId"));


  
  const logger = Moralis.Cloud.getLogger();
  logger.info(`The Parameters from contract ${JSON.stringify(request)}`); 
  
  if(request.object.get("confirmed") ==true)
   {  
         const MarketPlace =  Moralis.Object.extend("MarketPlace");
         const listing = new MarketPlace();
	  
         listing.set("contractAddress",contractAddress);
         listing.set("seller",seller);
         listing.set("tokenId",tokenId);
         listing.set("pricePerToken",pricePerToken);
         listing.set("listingId",listingId);
		 listing.set("completed",false);
   	     listing.save();
      
   }
 });
 
  Moralis.Cloud.afterSave("TokenSold", async function(request) {
 
   const listingId = parseInt(request.object.get("listingId"));
   

  
  const logger = Moralis.Cloud.getLogger();
  logger.info(`The Parameters from contract ${JSON.stringify(request)}`); 
  
  if(request.object.get("confirmed") ==true)
   { 
      
 
      const MarketPlace =  Moralis.Object.extend("MarketPlace");
      const query  = new Moralis.Query(MarketPlace);
	  query.equalTo("listingId",listingId); 
	  const result = await query.first({useMasterKey:true});
	  if(result){
		  result.set("completed",true); 
		  result.save();
      }
   
   }
 });
 
Moralis.Cloud.afterSave("TokenUnlisted", async function(request) {
 
   const listingId = parseInt(request.object.get("listingId"));
   

  
  const logger = Moralis.Cloud.getLogger();
  logger.info(`The Parameters from contract ${JSON.stringify(request)}`); 
  
  if(request.object.get("confirmed") ==true)
   { 
      
 
      const MarketPlace =  Moralis.Object.extend("MarketPlace");
      const query  = new Moralis.Query(MarketPlace);
	  query.equalTo("listingId",listingId); 
	  const result = await query.first({useMasterKey:true});
	  if(result){
		  result.set("completed",true); 
		  result.save();
      }
   
   }
 });
 