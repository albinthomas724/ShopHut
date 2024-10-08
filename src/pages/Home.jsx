import HomeBanner from "../components/HomeBanner";
import Category from "../components/CategoryCards";
import ProductListing from "../components/ProductListing";
import { ScrollProvider } from "../components/CategoryScrollContext";

import Footer from "../components/Footer";
function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <ScrollProvider>
          <div>
            <HomeBanner />
            <Category />
            <ProductListing />
          </div>
        </ScrollProvider>
      </main>

      <Footer />
    </div>
  );
}

export default Home;

<div className="min-h-screen flex flex-col">
  <main className="flex-grow">
    <ScrollProvider>
      <div>
        <HomeBanner />
        <Category />
        <ProductListing />
      </div>
    </ScrollProvider>
  </main>

  <Footer />
</div>;
