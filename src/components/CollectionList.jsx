import { useState } from "react";
import SaleModal from "./SaleModal";

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

  const [tokenId, setTokenId] = useState();
  function sellItem(id) {
    setOpenSale(true);
    setTokenId(id);
    if (openSale) {
      setOpenSale(false);
    }
  }
  return (
    <div className="bg-white z-50 rounded-xl overflow-y-scroll">
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
