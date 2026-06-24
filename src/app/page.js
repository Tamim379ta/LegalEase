import CtaBanner from "@/components/homepage/CtaBanner";
import FeaturedLawyers from "@/components/homepage/FeaturedLawyers";
import HeroPage from "@/components/homepage/Hero";
import LegalCategories from "@/components/homepage/LegalCategories";
import TopLegalExperts from "@/components/homepage/TopLegalExperts ";

export default function Home() {
  return (

    <div>
      <HeroPage/>
      <FeaturedLawyers/>
      <TopLegalExperts />
      <LegalCategories/> 
      <CtaBanner/>
    
    </div>
  );
}
