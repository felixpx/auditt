import Notification from "../Notification/Notification";
import {  useEffect,useState } from "react";
import { useMoralis } from "react-moralis";
import {AuDiTTNFTAddress} from '../../Contracts/AuDiTTNFT'
import { AuDiTTManagerAddress,AuDiTTManagerABI } from "../../Contracts/AuDiTTManagerContract";
import {ethers} from 'ethers'

const products = [
  {
    id: 1,
    name: "Auditt NFT",
    href: "#",
    imageSrc: "/adtt-nfts/adtt-50.png",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "50",
    color: "Collateral Art",
  },
  {
    id: 2,
    name: "Auditt NFT",
    href: "#",
    imageSrc: "/adtt-nfts/adtt-100.png",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "100",
    color: "Collateral Art",
  },
  {
    id: 3,
    name: "Auditt NFT",
    href: "#",
    imageSrc: "/adtt-nfts/adtt-500.png",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "500",
    color: "Collateral Art",
  },
  {
    id: 4,
    name: "Auditt NFT",
    href: "#",
    imageSrc: "/adtt-nfts/adtt-1000.png",

    imageAlt: "Front of men's Basic Tee in black.",
    price: "1000",
    color: "Collateral Art",
  },
  {
    id: 5,
    name: "Auditt NFT",
    href: "#",
    imageSrc: "/adtt-nfts/adtt-10000.png",

    imageAlt: "Front of men's Basic Tee in black.",
    price: "10000",
    color: "Collateral Art",
  },

  // More products...
];
export default function UnStake(props) {


 
  
  const unstakeNFT = async (tokenId) =>{

    if(props.approvedADTT == false)
    {
      setDialogType(2); //Failed
      setNotificationTitle("Unstaking Failed");
      setNotificationDescription("ADTT not approved.");
      setShow(true)
      return
    }
    const managerContract = new ethers.Contract(
      AuDiTTManagerAddress,
      AuDiTTManagerABI,
      web3.getSigner()
    );
    try{

      let transaction = await managerContract.unstake(
        tokenId
        );
        await transaction.wait();
          //Smart contract calls goes here
      setDialogType(1); //Success
      setNotificationTitle("Unstaking Successful");
      setNotificationDescription(`You have successfully unstaked your NFT.`);
      setShow(true);
    }
    catch(error)
    {
      setDialogType(2); //Failed
      setNotificationTitle("Unstaking Failed");
      setNotificationDescription(
        error.data ? error.data.message : error.message
      );
      setShow(true);
    }
    }
    const {web3} = useMoralis()

 //  NOTIFICATION STATES & FUNCTIONS
 const [show, setShow] = useState(false);
 const [notificationTitle, setNotificationTitle] = useState();
 const [notificationDescription, setNotificationDescription] = useState();
 const [dialogType, setDialogType] = useState(1);
 const close = async () => {
   setShow(false);
 };
  return   <div> 
     <div className="mb-8 sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Unstake NFT
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Unstake AuDiTT NFTs to burn ADTT for Off ramping 
          </p>
        </div>
      </div>
    <div className=" grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
  {products.map((product) => (
    <div
      onClick={() => unstakeNFT(product.id)}
      key={product.id}
      className="group relative"
    >
      <div className="min-h-80 aspect-w-1 aspect-h-1 w-full rounded-xl bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
        <img
          src={product.imageSrc}
          alt={product.imageAlt}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex z-20 justify-between">
        <div className="flex flex-col items-start">
          <h3 className="text-sm text-gray-700">
            <a href={product.href}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </a>
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            {product.color}
          </p>
        </div>
        <p className="text-sm font-medium text-gray-900">
          $ {product.price}
        </p>
      </div>
    </div>
  ))}
   <Notification
        type={dialogType}
        show={show}
        close={close}
        title={notificationTitle}
        description={notificationDescription}
      />
</div></div>;
}
