import MarketList from "./MarketList";
import {ADTTAddress,ADTTABI} from "../../Contracts/ADTTContract";
import { useState,useEffect } from "react";
import { useMoralis } from "react-moralis";
import {ethers} from 'ethers'
import {MarketPlaceAddress} from '../../Contracts/MarketplaceContract'
import Notification from "../Notification/Notification";

export default function Market() {
  const {web3,isAuthenticated,user} = useMoralis()

    //  NOTIFICATION STATES & FUNCTIONS
 const [show, setShow] = useState(false);
 const [notificationTitle, setNotificationTitle] = useState();
 const [notificationDescription, setNotificationDescription] = useState();
 const [dialogType, setDialogType] = useState(1);
 const close = async () => {
   setShow(false);
 };
 const [gotApproveADTT, setGotApprovedADTT]  = useState(false)
  const [approvedADTT,setApprovedADTT]  = useState(false) 

 const approveADTT = async() =>{
  try {
   const adttContract = new ethers.Contract(ADTTAddress,ADTTABI,web3.getSigner());
   let transaction = await adttContract.approve(
   MarketPlaceAddress,ethers.constants.MaxUint256
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
//Check if ADTT is approved 
  
useEffect(()=>{
  async function setup() {

    
    if(isAuthenticated && user && web3)
    {
      const adttContract = new ethers.Contract(ADTTAddress,ADTTABI,web3.getSigner());
      let transaction = await adttContract.allowance(
        user.get('ethAddress'),MarketPlaceAddress
      );
      //const value = transaction;
      setGotApprovedADTT(true)
      setApprovedADTT((transaction.gt(0) ? true: false));
  //    console.log(transaction.gt(0))

  
    }  
    
   
  }
  setup()
},[isAuthenticated,web3,user])
  return (
    <main className="-mt-32 z-50 ">
      <div className="mx-auto overflow-hidden max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <button    onClick={approveADTT}
              className={`${(gotApproveADTT && approvedADTT ? "hidden": "" )} m-4 w-2/12 mt-2 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
  >Approve ADTT</button>
      
        <MarketList approvedADTT={approveADTT}/>
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
