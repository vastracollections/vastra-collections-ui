import Header from "../../components/Header/Header";
import "./HomePage.css";
import BannerSection from "../../pages/HomePage/bannerSection/bannerSection";
import PopularCategories from "../../pages/HomePage/popularCategories/popularCategories";
import FeaturedProducts from "../../pages/HomePage/FeaturedProducts/FeaturedProducts";


// HomePage Component
const HomePage = () => {

  return (
    <div>
      <Header />
      <BannerSection/>
      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Popular Section */}
      <PopularCategories />
    </div>
  );
};


export default HomePage;

