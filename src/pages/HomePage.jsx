import Hero from "../components/home/Hero";
import FeaturedProperties from "../components/home/FeaturedProperties";
import RecentlyViewed from "../components/home/RecentlyViewed";
import Categories from "../components/home/Categories";
import HowItWorks from "../components/home/HowItWorks";
import StatsCounter from "../components/home/StatsCounter";
import Testimonials from "../components/home/Testimonials";
import Newsletter from "../components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <RecentlyViewed />
      <Categories />
      <HowItWorks />
      <StatsCounter />
      <Testimonials />
      <Newsletter />
    </>
  );
}