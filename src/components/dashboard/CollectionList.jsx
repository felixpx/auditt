import { useState, useEffect } from "react";
import SaleModal from "../modals/SaleModal";
import { useMoralis } from "react-moralis";
import { covalentGetMetadataForContract } from "../../utils/utils";
const products = [
  {
    id: 1,
    name: "Auditt NFT",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$99",
    color: "Collateral Art",
  },
  {
    id: 1,
    name: "ARTWORK XYZ",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$10000",
    color: "Art",
  },
  {
    id: 1,
    name: "Auditt NFT",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$99",
    color: "Collateral Art",
  },
  {
    id: 1,
    name: "ARTWORK XYZ",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$10000",
    color: "Art",
  },
];

export default function Marketlist() {
  const [openSale, setOpenSale] = useState(false);
  const [selected, setSelected] = useState();

  const [gotCollections, setGotCollections] = useState(false);
  const [collections, setCollections] = useState([]);
  const [data, setData] = useState(new Map());
  const [myListings, setMyListings] = useState(new Map());
  const [metadata, setMetadata] = useState([]);

  const { Moralis, isWeb3Enabled, enableWeb3, user } = useMoralis();

  const [tokenId, setTokenId] = useState();
  function sellItem(id) {
    setOpenSale(true);
    setTokenId(id);
    if (openSale) {
      setOpenSale(false);
    }
  }
  const handleChange = (event) => {
    setSelected(event.target.value);
  };

  //Get My Collections
  useEffect(() => {
    const Collection = Moralis.Object.extend("Collection");
    const query = new Moralis.Query(Collection);
    query.ascending("name");
    query.equalTo("owner", user.get("ethAddress").toLowerCase());
    query.find().then((results) => {
      setCollections(results);
      let d = new Map();
      results.forEach(async (result) => {
        d[result.id] = result;
      });
      setData(d);

      setGotCollections(true);
      if (results.length > 0) setSelected(results[0].id);
    });
  }, []);

  //Get My NFT Listings in Market Place
  useEffect(() => {
    if (gotCollections) {
      const MarketPlace = Moralis.Object.extend("MarketPlace");
      const query = new Moralis.Query(MarketPlace);
      query.equalTo("seller", user.get("ethAddress").toLowerCase());
      query.equalTo("completed", false);
      query.find().then((results) => {
        let p = new Map();
        results.forEach((result) => {
          p[result.id] = true;
        });
        setMyListings(p);
      });
    }
  }, [selected]);

  //Get
  useEffect(() => {
    async function getMetadata() {
      if (gotCollections) {
        const results = await covalentGetMetadataForContract(
          data[selected].get("contractAddress")
        );
        console.log(results);
        alert(`${data[selected].get("contractAddress")}  `);
        alert(JSON.stringify(results));
      }
    }
    getMetadata();
  }, [selected]);

  function createCollection() {
    // pop up modal create collection
  }
  function mintNFT() {
    // pop up modal create collection
  }

  return (
    <div className="bg-white z-50 rounded-xl overflow-y-scroll">
      <div className="flex flex-row items-center justify-evenly">
        <select
          id="collection"
          value={selected}
          onChange={handleChange}
          name="country"
          autoComplete="collection-name"
          className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
        >
          {collections.map((collection, index) => (
            <option value={collection.id}>{collection.get("name")}</option>
          ))}
        </select>
        <button
          onClick={createCollection}
          className={` m-4 w-2/12 mt-2 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          Create Collection
        </button>
        <button
          onClick={mintNFT}
          className={` m-4 w-2/12 mt-2 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          Mint NFT
        </button>
      </div>

      <div className="mx-auto max-w-2xl py-8 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        {openSale && <SaleModal tokenId={tokenId} />}
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div
              onClick={() => sellItem(product.id)}
              key={product.id}
              className="group relative"
            >
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
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
                  <p className="mt-1 text-xs text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
