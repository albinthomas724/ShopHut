import CartItems from "../components/CartItems";
import Footer from "../components/Footer";

function Cart() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <CartItems />
      </main>

      <Footer />
    </div>
  );
}

export default Cart;
