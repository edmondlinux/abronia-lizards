import ProductListSec from "@/components/common/ProductListSec";
import Brands from "@/components/homepage/Brands";
import DressStyle from "@/components/homepage/DressStyle";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import { Product } from "@/types/product.types";
import { reviewsData } from "@/data/reviews";

async function getProducts() {
  try {
    const res = await fetch(`https://f8b5c4d4-5a35-4fa4-a07a-3fc959c6c097-00-xos5xnra644k.kirk.replit.dev/api/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Fetch all products and split them into different sections
async function getData() {
  const allProducts = await getProducts();
  return {
    newArrivals: allProducts.slice(0, 4),
    topSelling: allProducts.slice(4, 8),
    relatedProducts: allProducts.slice(8, 12)
  };
}



export default async function Home() {
  const { newArrivals, topSelling } = await getData();

  return (
    <>
      <Header />
      <Brands />
      <main className="my-[50px] sm:my-[72px]">
        <ProductListSec
          title="NEW ARRIVALS"
          data={newArrivals}
          viewAllLink="/shop#new-arrivals"
        />
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <ProductListSec
            title="top selling"
            data={topSelling}
            viewAllLink="/shop#top-selling"
          />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <DressStyle />
        </div>
        <Reviews data={reviewsData} />
      </main>
    </>
  );
}