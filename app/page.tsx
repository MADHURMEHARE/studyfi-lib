import SidebarNavigation from '@/components/homepage/SidebarNavigation';
import HeroSection from '@/components/homepage/HeroSection';
import AboutSection from '@/components/homepage/AboutSection';
import FeaturesSection from '@/components/homepage/FeaturesSection';
import MembershipSection from '@/components/homepage/MembershipSection';
import FooterSection from '@/components/homepage/FooterSection';
import { heroFeatures,features } from '@/components/homepage/utils/data/DATA';
// import {Searchbar} from '@/components/homepage/Searchbar';
export default function Home() {
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <SidebarNavigation />

      {/* <Searchbar/> */}
 <div className='w-screen '>
      <HeroSection
        heading="Welcome to"
        subHeading="StudyFi Library"
        description="Study in comfort, Achieve with Confidence. Specially Designed for All Competitive Students"
        features={heroFeatures}
        videoUrl="/videos/Hero.mp4" // Make sure file exists in public/videos
        
      /> 
      
      {/* <Searchbar/> */}
     </div>  
      <AboutSection />
      <FeaturesSection />
      <MembershipSection />
      <FooterSection />
      {/* <Searchbar/> */}
    </div>
  );
}
