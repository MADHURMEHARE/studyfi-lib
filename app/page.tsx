import SidebarNavigation from '@/components/homepage/SidebarNavigation';
import HeroSection from '@/components/homepage/HeroSection';
import AboutSection from '@/components/homepage/AboutSection';
import FeaturesSection from '@/components/homepage/FeaturesSection';
import MembershipSection from '@/components/homepage/MembershipSection';
import { heroFeatures } from '@/utils/DATA';
import StudentList from '../components/common/Studentlist'; // <-- import student search/filter component

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <SidebarNavigation />

      {/* Hero Section */}
      <div className='w-screen'>
        <HeroSection
          heading="Welcome to"
          subHeading="StudyFi Library"
          description="Study in comfort, Achieve with Confidence. Specially Designed for All Competitive Students"
          features={heroFeatures}
          videoUrl="/videos/Heroo.mp4" // Make sure file exists in public/videos
        /> 
      <div className="p-8 max-w-6xl mx-auto">
    {/* Heading */}
  <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-center text-gray-900 leading-snug">
    Inside the Journey of High-Achieving Students
  </h2>

   {/* Subheading / Description */}
  <p className="text-base md:text-lg font-medium text-gray-600 text-center mb-8">
    Real stories, strategies, and struggles to guide your preparation.
  </p>

  {/* Student List */}
  <StudentList /> {/* Search bar + filtered cards */}
</div>

      </div>

      {/* About & Features */}
      <AboutSection />
      <FeaturesSection />
      <MembershipSection />

      {/* Search & Student Journey Cards */}
      

      {/* Footer */}
      {/* <FooterSection /> */}
    </div>
  );
}
