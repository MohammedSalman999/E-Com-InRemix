import { useCartStore } from "~/stores/cart.store";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "@remix-run/react";

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();

  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="flex-1 p-8 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-6">Your cart is empty</h1>
        <p className="text-gray-500 mb-6">
          Your Cart is looking soo empty ... 
        </p>
        <Link to="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="grid gap-4 mb-6">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.imageUrl || "/placeholder.svg"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <span className="w-8 text-center">{item.quantity}</span>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-right">
                  <p className="font-semibold">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 p-0 h-auto mt-1"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    <span className="text-xs">Remove</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:justify-between items-start">
        <Button variant="outline" onClick={clearCart}>
          Clear Cart
        </Button>

        <Card className="w-full md:w-72">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
            <Button className="w-full mt-4">Proceed to Checkout</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
