import { useState,useEffect } from "react";
import CreditCardModal from "../modals/CreditCardModal";
import PurchaseModal from "../modals/PurchaseModal";

import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import {AuDiTTNFTAddress} from '../../Contracts/AuDiTTNFT'
import { AuDiTTManagerAddress,AuDiTTManagerABI } from "../../Contracts/AuDiTTManagerContract";
import {MarketPlaceAddress,MarketPlaceABI} from '../../Contracts/MarketplaceContract'
import {ethers} from 'ethers'
import Notification from "../Notification/Notification";
import {covalentGetTokenMetadata} from '../../utils/utils'
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

const tabs = [
  { name: "AuDiTT Listings", href: "#", current: true },
  { name: "NFT Listing", href: "#", current: false },

  { name: "Collections", href: "#", current: false }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Marketlist(props) {
  const {enableWeb3,isWeb3Enabled,web3,Moralis} = useMoralis()
  const { Web3API } = useMoralisWeb3Api();

  const [collections,setCollections] = useState([])
  const [marketPlace,setMarketPlace] = useState([])

  //  NOTIFICATION STATES & FUNCTIONS
 const [show, setShow] = useState(false);
 const [notificationTitle, setNotificationTitle] = useState();
 const [notificationDescription, setNotificationDescription] = useState();
 const [dialogType, setDialogType] = useState(1);
 const close = async () => {
   setShow(false);
 };
  // TAB SECTION
  const [selectedTab, setSelectedTab] = useState("AuDiTT Listings");

  // LISTING SECTION
  const [openPurchase, setOpenPurchase] = useState(false);
  const [openCreditCard,setOpenCreditCard] = useState(false)
  const [tokenId, setTokenId] = useState();
  const [listingId,setListingId] = useState()
 //Get Collections
 useEffect(()=>{
    const Collection = Moralis.Object.extend("Collection");
    const query = new Moralis.Query(Collection)
    query.find().then((results)=>{
         setCollections(results)
         console.log(results)
    })

 },[])


  //Get MarketPlace Listing
  useEffect(()=>{
    const MarketPlace = Moralis.Object.extend("MarketPlace");
    const query = new Moralis.Query(MarketPlace)
    query.equalTo("completed",false);
    query.find().then((results)=>{
      let nfts = [];
      results.forEach(async (result)=>{
        const metadata = await covalentGetTokenMetadata("0xcC45d6e2635eE872D38c156986abFA272c4e95Ed",result.get("tokenId"))
         nfts.push({id:result.id,collection:metadata.name,name:metadata.metadata.name,symbol:metadata.symbol,image:metadata.image,listingId:result.get("listingId"),price:result.get("pricePerToken")})
        })
         setMarketPlace(nfts)
         console.log(results)
    })

 },[])
  function buyItem(id) {
    setOpenPurchase(true);
    setListingId(id);
   
  }

  async function buyAuDiTTNFT(id){
    setTokenId(id)
    setOpenCreditCard(true)
  }

  
  const closePurchaseModal = () =>{
    setOpenPurchase(false)
    
  }
  const closeModal = () =>{
    setOpenCreditCard(false)
    
  }

  const claimTokens = async (id) =>{
    const managerContract = new ethers.Contract(
      AuDiTTManagerAddress,
      AuDiTTManagerABI,
      web3.getSigner()
    );

    try{
      let transaction = await managerContract.claimToken(
       id,{gasLimit:300000}
       );
       await transaction.wait();
      
      setDialogType(1); //Success
      setNotificationTitle("Token Purchase Successful");
      setNotificationDescription(`You have successfully purchased an NFT.`);
      setShow(true);
      setOpenCreditCard(false)

    }
    catch(error)
    {
      setDialogType(2); //Failed
      setNotificationTitle("Token Purchase Failed");
      setNotificationDescription(
        error.data ? error.data.message : error.message
      );
      setShow(true);
    }
  }

  

  const purchaseNFT = async () =>{


    if(props.approvedADTT == false)
    {
      setDialogType(2); //Failed
      setNotificationTitle("Purchase Failed");
      setNotificationDescription("ADTT not approved.");
      setShow(true)
      return
    }
    const marketPlaceContract = new ethers.Contract(
      MarketPlaceAddress,
      MarketPlaceABI,
      web3.getSigner()
    );

    try{
      let transaction = await marketPlaceContract.purchaseToken(
       listingId,{gasLimit:300000}
       );
       await transaction.wait();
      
      setDialogType(1); //Success
      setNotificationTitle("Token Purchase Successful");
      setNotificationDescription(`You have successfully purchased an NFT.`);
      setShow(true);
      setOpenPurchase(false)

    }
    catch(error)
    {
      setDialogType(2); //Failed
      setNotificationTitle("Token Purchase Failed");
      setNotificationDescription(error.data ? error.data.message : error.message

      );
      console.log(error)
      alert(JSON.stringify(error.data.message))

      setShow(true);
    }
  }
  return (
    <div className="bg-white z-50 rounded-xl  shadow-xl">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-8 sm:px-6 lg:max-w-7xl lg:px-8">
        {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Listings
        </h2> */}
        {/* NAVIGATION INPUT TABS */}
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-gray-300 focus:border-gray-500 focus:ring-gray-500"
            defaultValue={tabs.find((tab) => tab.current).name}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav
            className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
            aria-label="Tabs"
          >
            {tabs.map((tab, tabIdx) => (
              <a
                key={tab.name}
                onClick={() => {
                  setSelectedTab(tab.name);
                }}
                className={classNames(
                  selectedTab == tab.name
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-700",
                  tabIdx === 0 ? "rounded-l-lg" : "",
                  tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                  "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                <span>{tab.name}</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    selectedTab == tab.name ? "bg-gray-500" : "bg-transparent",
                    "absolute inset-x-0 bottom-0 h-0.5"
                  )}
                />
              </a>
            ))}
          </nav>
        </div>

        {/* NAVIGATION OUTPUT */}

        {/* AUDITT LISTINGS */}
        <div hidden={selectedTab != "AuDiTT Listings"} className="py-32">
          <CreditCardModal tokenId={tokenId} open={openCreditCard} claimTokens={claimTokens} closeModal={closeModal}/>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
            {products.map((product) => (
              <div
                onClick={() => buyAuDiTTNFT(product.id)}
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
          </div>
        </div>
  {/* NFT Listing */}
  <div hidden={selectedTab != "NFT Listing"} className="py-16">
        <PurchaseModal listingId={listingId} purchaseNFT={purchaseNFT} open={openPurchase} closePurchaseModal={closePurchaseModal}/>
         

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
            {marketPlace.map((nft) => (
              <div
                onClick={() => buyItem(nft.listingId)}
                key={nft.id}
                className="group relative"
              >
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img
                    src={nft.image}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex z-20 justify-between">
                  <div className="flex flex-col items-start">
                    <h3 className="text-sm text-gray-700">
                      <a href="#">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {nft.collection}
                      </a>
                    </h3>
                    <h3 className="text-sm text-gray-700">
                      <a href="#">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {nft.name}
                      </a>
                    </h3>
                  
                    <p className="mt-1 text-xs text-gray-500">
                      {nft.symbol}
                    </p>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                      {`${ethers.utils.formatEther(nft.price)} ADTT`}
                    </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* COLLECTION ARTICLES */}
        <div hidden={selectedTab != "Collections"} className="py-16">
         

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
            {collections.map((collection) => (
              <div
                onClick={() => buyItem(product.id)}
                key={collection.id}
                className="group relative"
              >
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img
                    src="https://images.unsplash.com/photo-1500628550463-c8881a54d4d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80"
                    
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex z-20 justify-between">
                  <div className="flex flex-col items-start">
                    <h3 className="text-sm text-gray-700">
                      <a href="#">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {collection.get("collection")}
                      </a>
                    </h3>
                    <h3 className="text-sm text-gray-700">
                      <a href="#">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {collection.get("name")}
                      </a>
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      {collection.get("symbol")}
                    </p>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Notification
        type={dialogType}
        show={show}
        close={close}
        title={notificationTitle}
        description={notificationDescription}
      />
    </div>
  );
}
