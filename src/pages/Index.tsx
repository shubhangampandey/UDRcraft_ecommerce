import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import BestSellers from '@/components/BestSellers';
import DealsSection from '@/components/DealsSection';
import NewArrivals from '@/components/NewArrivals';
import Testimonials from '@/components/Testimonials';
import BrandStory from '@/components/BrandStory';
import Newsletter from '@/components/Newsletter';
import InstagramSection from '@/components/InstagramSection';

const Index = () => {
  return (
    <main>
      <Hero />
      <CategorySection />
      <BestSellers />
      <DealsSection />
      <NewArrivals />
      <BrandStory />
      <Testimonials />
      <Newsletter />
      <InstagramSection />
    </main>
  );
};

export default Index;
