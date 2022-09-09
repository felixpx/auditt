import { useState } from "react";
import PurchaseModal from "./PurchaseModal";

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
    name: "ARTWORK XYZ",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$10000",
    color: "Art",
  },
  // More products...
];

export default function Marketlist() {
  const [openPurchase, setOpenPurchase] = useState(false);

  const [tokenId, setTokenId] = useState();
  function buyItem(id) {
    setOpenPurchase(true);
    setTokenId(id);
    if (openPurchase) {
      setOpenPurchase(false);
    }
  }
  return (
    <div className="bg-white rounded-xl overflow-y-scroll shadow-xl">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Listings
        </h2>
        {openPurchase && <PurchaseModal tokenId={tokenId} />}
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div
              onClick={() => buyItem(product.id)}
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
