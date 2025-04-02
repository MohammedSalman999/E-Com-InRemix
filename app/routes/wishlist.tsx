import { useCartStore } from "~/stores/cart.store";
import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist, moveToCart } = useCartStore();

  return (
    <div className="flex-1 p-8">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500 mb-4">Your wishlist is empty</p>
          <Link to="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {wishlistItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => moveToCart(item)}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
