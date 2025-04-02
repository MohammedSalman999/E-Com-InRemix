import { Link } from "@remix-run/react";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "~/stores/cart.store";

export function CartIcon() {
  const { items } = useCartStore();
  return (
    <Link to="/cart" className="relative">
      <ShoppingCart className="h-6 w-6" />
      {items.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
          {items.length}
        </span>
      )}
    </Link>
  );
}
