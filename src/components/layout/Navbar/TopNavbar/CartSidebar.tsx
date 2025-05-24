
"use client";

import { useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/cart-page/ProductCard";

const CartSidebar = () => {
  const { cart, adjustedTotalPrice } = useAppSelector((state: RootState) => state.carts);

  if (!cart || cart.items.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <span className="text-black/60 mb-4">Your cart is empty</span>
        <Button asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <h3 className="font-bold text-xl mb-4">Shopping Cart</h3>
      <div className="flex-1 space-y-4 overflow-y-auto">
        {cart.items.map((item, idx) => (
          <ProductCard key={`${item.id}-${idx}`} data={item} />
        ))}
      </div>
      <div className="border-t border-black/10 pt-4 mt-4">
        <div className="flex justify-between mb-4">
          <span>Total:</span>
          <span className="font-bold">${adjustedTotalPrice}</span>
        </div>
        <Button asChild className="w-full">
          <Link href="/cart">View Cart</Link>
        </Button>
      </div>
    </div>
  );
};

export default CartSidebar;
