// @/app/page.tsx or @/pages/Home.tsx (The main layout file)
import SidebarNavigation from '@/components/homepage/SidebarNavigation';
import HeroSection from '@/components/homepage/HeroSection';
import AboutSection from '@/components/homepage/AboutSection';
import MembershipSection from '@/components/homepage/MembershipSection';
import FooterSection from '@/components/homepage/FooterSection';
import { heroFeatures } from '@/utils/DATA';
import StudentList from '@/components/common/Studentlist';
import ScrollPerspectiveWrapper from '@/components/common/ScrollPerspectiveWrapper';
import FeaturesSection from "components/homepage/FeaturesSection"
export default function Home() {
  return (
    // Removed the outer 'flex min-h-screen w-full' to ensure standard body scrolling is used.
    // The browser's main scrollbar should now control the content.
    <>
    <div className="w-screen  "> 
      
      {/* 1. Sidebar (It's fixed/floating, so it doesn't need to be in the flow) */}
{/*       <SidebarNavigation /> */}

      {/* 2. Main Content Area: Padding added to the LEFT to prevent content from going under the fixed sidebar. */}
       {/* Add padding for the floating sidebar (adjust 20 as needed) */}
{/*         <ScrollPerspectiveWrapper> */}
          <HeroSection
            heading="Welcome to"
            subHeading="StudyFi Library"
            description="Study in comfort, Achieve with Confidence. Specially Designed for All Competitive Students"
            features={heroFeatures}
            videoUrl="/videos/Heroo.mp4" 
          />

          {/* Inner Content Block */}
         <div className="py-16 px-4 sm:px-6 lg:px-8  mx-auto">
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-black-900 mb-4 tracking-tight">
        Inside the Journey of High-Achieving Students
    </h2>
    <p className="text-base sm:text-lg md:text-xl text-center text-black  mb-12 max-w-4xl mx-auto leading-relaxed">
        Real stories, strategies, and struggles to guide your preparation. Learn how top students overcame challenges and excelled in competitive exams.
    </p>
    <div className="space">
        <StudentList />
    </div>
</div>

   <div className="w-screen bg-orange-800">
          <AboutSection />
</div><div className="w-screen bg-red-800">
          <FeaturesSection/>
</div>
 <div className="w-screen bg-white">
          <MembershipSection />
</div>
{/*           <FooterSection />  */}
{/*         </ScrollPerspectiveWrapper> */}
     
    </div>
</>


  );
}