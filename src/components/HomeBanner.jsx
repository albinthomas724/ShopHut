import Button from "@mui/material/Button";

function HomeBanner() {
  return (
    <div>
      <div className="flex justify-evenly items-center">
        <img
          src="src\assets\BannerImage.jpg"
          alt="banner image"
          width={"50%"}
        />
        <div>
          <h1 className="font-bold text-3xl">
            Unbeatable Deals, Unmatched Style!
          </h1>
          <p className="mt-2">
            Discover the latest trends in fashion, accessories, and gadgets. Be
            the first to get your hands on the newest collections. Fast delivery
            and easy returns!
          </p>
        </div>
      </div>
      <div className="text-center">
        <Button variant="contained">Explore Now</Button>
      </div>
    </div>
  );
}

export default HomeBanner;
