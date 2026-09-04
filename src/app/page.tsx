import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Identity from "@/components/sections/Identity";
import SelectedProjects from "@/components/sections/SelectedProjects";
import Services from "@/components/sections/Services";
import WhyWiz from "@/components/sections/WhyWiz";
import ExperienceStats from "@/components/sections/ExperienceStats";
import SelectedClients from "@/components/sections/SelectedClients";
import QuickContact from "@/components/sections/QuickContact";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Identity />
        <SelectedProjects />
        <Services />
        <WhyWiz />
        <ExperienceStats />
        <SelectedClients />
        <QuickContact />
      </main>
      <Footer />
    </>
  );
}
