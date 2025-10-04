import Navigation from '@/components/shared/Navigation';
import SidebarNavigation from '@/components/homepage/SidebarNavigation';
import HeroSection from '@/components/homepage/HeroSection';
import AboutSection from '@/components/homepage/AboutSection';
import FeaturesSection from '@/components/homepage/FeaturesSection';
import MembershipSection from '@/components/homepage/MembershipSection';
import BlogSection from '@/components/homepage/BlogSection';
import FooterSection from '@/components/homepage/FooterSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <SidebarNavigation />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <MembershipSection />
      <BlogSection />  
    </div>
  );
}
