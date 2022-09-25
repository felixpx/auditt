import StakingTabs from "./StakingTabs";
import Notification from "../Notification/Notification";
import { AuDiTTNFTAddress,AuDiTTNFTABI } from "../../Contracts/AuDiTTNFT";
import {ADTTAddress,ADTTABI} from "../../Contracts/ADTTContract";
import { AuDiTTManagerAddress } from "../../Contracts/AuDiTTManagerContract";
import { useState,useEffect } from "react";
import { useMoralis } from "react-moralis";
import {ethers} from 'ethers'
export default function Market() {
  const [gotApproveAuDiTTNFT, setGotApprovedAuDiTTNFT]  = useState(false)
  const [gotApproveADTT, setGotApprovedADTT]  = useState(false)
  const [approvedADTT,setApprovedADTT]  = useState(false)
  const [approvedAuDiTTNFT,setApprovedAuDiTTNFT]  = useState(false)
  const {user,web3,isEnabledWeb3,isAuthenticated,enableWeb3} = useMoralis()
  //  NOTIFICATION STATES & FUNCTIONS
 const [show, setShow] = useState(false);
 const [notificationTitle, setNotificationTitle] = useState();
 const [notificationDescription, setNotificationDescription] = useState();
 const [dialogType, setDialogType] = useState(1);
 const close = async () => {
   setShow(false);
 };
 

 const approveADTT = async() =>{
  try {
   const adttContract = new ethers.Contract(ADTTAddress,ADTTABI,web3.getSigner());
   let transaction = await adttContract.approve(
   AuDiTTManagerAddress,ethers.constants.MaxUint256
  );
  
    await transaction.wait();
    console.log(transaction);
    setDialogType(1); //Success
    setNotificationTitle("Approve ADTT Successful")
    setNotificationDescription("Approval Successful.")
    setShow(true)
    setApprovedADTT(true)
   } 
   catch(error){
    setDialogType(2); //Failed
    setNotificationTitle("Approve ADTT Failed")
    setNotificationDescription(error.data ? error.data.message : error.message
      )

    setShow(true)
    
    
   }
   
}

  const approveNFT = async() =>{
    try {
     const nftContract = new ethers.Contract(AuDiTTNFTAddress,AuDiTTNFTABI,web3.getSigner());
     let transaction = await nftContract.setApprovalForAll(
     AuDiTTManagerAddress,true
    );
    
      await transaction.wait();
      console.log(transaction);
      setDialogType(1); //Success
      setNotificationTitle("Approve Successful")
      setNotificationDescription("Approval Successful.")
      setShow(true)
      setApprovedAuDiTTNFT(true)
     } 
     catch(error){
      setDialogType(2); //Failed
      setNotificationTitle("Approve Failed")
      setNotificationDescription(error.message)

      setShow(true)
      
     }
     
  }
  

  //Check if ADTT is approved 
  
 useEffect(()=>{
  async function setup() {

    
    if(isAuthenticated && user && web3)
    {
      const adttContract = new ethers.Contract(ADTTAddress,ADTTABI,web3.getSigner());
      let transaction = await adttContract.allowance(
        user.get('ethAddress'),AuDiTTManagerAddress
      );
      //const value = transaction;
      setGotApprovedADTT(true)
      setApprovedADTT((transaction.gt(0) ? true: false));
  //    console.log(transaction.gt(0))

  
    }  
    
   
  }
  setup()
},[isAuthenticated,web3,user])


  //Checks if NFTs are approved for staking 
  useEffect(()=>{
    async function setup() {
 
      
      if(isAuthenticated && user && web3)
      {
        if(!isEnabledWeb3) await enableWeb3();
        const nftContract = new ethers.Contract(AuDiTTNFTAddress,AuDiTTNFTABI,web3.getSigner());
        let transaction = await nftContract.isApprovedForAll(
          user.get('ethAddress'),AuDiTTManagerAddress
        );
        
        setGotApprovedAuDiTTNFT(true)
        setApprovedAuDiTTNFT((transaction));
        
      }  
      
     
    }
    setup()
  },[isAuthenticated,web3,user])

  
  return (
    <main className="-mt-32 z-50 overflow-hidden">
      <div className="mx-auto overflow-hidden max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <button    onClick={approveNFT}
              className={`${(gotApproveAuDiTTNFT && approvedAuDiTTNFT ? "hidden": "" )} m-4 w-2/12 mt-2 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
  >Approve NFT</button>

<button    onClick={approveADTT}
              className={`${(gotApproveADTT && approvedADTT ? "hidden": "" )} m-4 w-2/12 mt-2 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
  >Approve ADTT</button>
        <StakingTabs nftApproval={approvedAuDiTTNFT } approvedADTT={approvedADTT}/>
      </div>
      <Notification
        type={dialogType}
        show={show}
        close={close}
        title={notificationTitle}
        description={notificationDescription}
      />
    </main>
  );
}
