import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';

const Checkout = () => {
  const { items, cartTotal } = useCart();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <main className="pt-32 luxury-container text-center min-h-screen">
        <h1 className="luxury-heading mb-6">Thank You</h1>
        <p className="font-body text-sm text-muted-foreground mb-8">Your order has been placed. We'll send you a confirmation email shortly.</p>
        <Link to="/" className="luxury-underline font-body text-xs uppercase tracking-[0.15em] pb-0.5">Back to Home</Link>
      </main>
    );
  }

  return (
    <main className="pt-20 md:pt-24 min-h-screen">
      <div className="luxury-container max-w-4xl mx-auto">
        <div className="text-center py-12 md:py-16">
          <h1 className="luxury-heading">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form */}
          <div>
            <h3 className="font-body text-xs uppercase tracking-[0.15em] mb-6">Shipping Information</h3>
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="First name" required className="border border-border px-4 py-3 font-body text-sm bg-transparent outline-none focus:border-foreground transition-colors" />
                <input placeholder="Last name" required className="border border-border px-4 py-3 font-body text-sm bg-transparent outline-none focus:border-foreground transition-colors" />
              </div>
              <input placeholder="Email address" type="email" required className="w-full border border-border px-4 py-3 font-body text-sm bg-transparent outline-none focus:border-foreground transition-colors" />
              <input placeholder="Phone number" type="tel" className="w-full border border-border px-4 py-3 font-body text-sm bg-transparent outline-none focus:border-foreground transition-colors" />
              <input placeholder="Address" required className="w-full border border-border px-4 py-3 font-body text-sm bg-transparent outline-none focus:border-foreground transition-colors" />
              <div className="grid grid-cols-3 gap-4">
                <input placeholder="City" required className="border border-border px-4 py-3 font-body text-sm bg-transparent outline-none focus:border-foreground transition-colors" />
                <input placeholder="State" className="border border-border px-4 py-3 font-body text-sm bg-transparent outline-none focus:border-foreground transition-colors" />
                <input placeholder="ZIP" required className="border border-border px-4 py-3 font-body text-sm bg-transparent outline-none focus:border-foreground transition-colors" />
              </div>

              <h3 className="font-body text-xs uppercase tracking-[0.15em] mt-8 mb-4 pt-4">Payment</h3>
              <input placeholder="Card number" required className="w-full border border-border px-4 py-3 font-body text-sm bg-transparent outline-none focus:border-foreground transition-colors" />
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="MM / YY" required className="border border-border px-4 py-3 font-body text-sm bg-transparent outline-none focus:border-foreground transition-colors" />
                <input placeholder="CVC" required className="border border-border px-4 py-3 font-body text-sm bg-transparent outline-none focus:border-foreground transition-colors" />
              </div>

              <button type="submit" className="w-full bg-foreground text-background py-3.5 font-body text-xs uppercase tracking-[0.2em] luxury-hover hover:bg-foreground/90 mt-6">
                Place Order — ${(cartTotal + (cartTotal > 500 ? 0 : 50)).toLocaleString()}
              </button>
            </form>
          </div>

          {/* Summary */}
          <div className="bg-secondary p-8 h-fit">
            <h3 className="font-body text-xs uppercase tracking-[0.15em] mb-6">Order Summary</h3>
            <div className="space-y-4 mb-6">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4">
                  <div className="w-16 h-20 bg-background shrink-0">
                    <img src={product.image || "https://placehold.co/600x600?text=No+Image"} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-display text-sm font-light">{product.name}</p>
                    <p className="font-body text-xs text-muted-foreground">Qty: {quantity}</p>
                  </div>
                  <p className="font-body text-sm">${(product.price * quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between font-body text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-body text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>{cartTotal > 500 ? 'Free' : '$50'}</span>
              </div>
              <div className="flex justify-between font-display text-xl pt-2 border-t border-border mt-2">
                <span>Total</span>
                <span>${(cartTotal + (cartTotal > 500 ? 0 : 50)).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="py-20" />
      </div>
    </main>
  );
};

export default Checkout;
