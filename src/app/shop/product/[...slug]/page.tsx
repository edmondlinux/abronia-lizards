
import ProductListSec from "@/components/common/ProductListSec";
import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Header from "@/components/product-page/Header";
import Tabs from "@/components/product-page/Tabs";
import { Product } from "@/types/product.types";
import { notFound } from "next/navigation";

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

export async function generateMetadata({ params }: { params: { slug: string[] }}) {
  const products = await getProducts();
  const productData = products.find(
    (product: Product) => product.id === Number(params.slug[0])
  );

  if (!productData?.seo) {
    return {
      title: productData?.title || 'Product Not Found',
      description: `${productData?.title} - Shop.co`
    };
  }

  return {
    title: productData.seo.title,
    description: productData.seo.description,
    keywords: productData.seo.keywords,
    openGraph: {
      title: productData.seo.title,
      description: productData.seo.description,
      images: [{
        url: productData.srcUrl,
        width: 800,
        height: 600,
        alt: productData.title
      }]
    },
    metadataBase: new URL('https://shop.co'),
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const products = await getProducts();
  const productData = products.find(
    (product: Product) => product.id === Number(params.slug[0])
  );

  if (!productData?.title) {
    notFound();
  }

  const relatedProducts = products.slice(8, 12);

  return (
    <main>
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbProduct title={productData?.title ?? "product"} />
        <section className="mb-11">
          <Header data={productData} />
        </section>
        <Tabs />
      </div>
      <div className="mb-[50px] sm:mb-20">
        <ProductListSec title="You might also like" data={relatedProducts} />
      </div>
    </main>
  );
}
