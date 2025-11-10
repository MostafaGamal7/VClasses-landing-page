import Header from "@/components/Header";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Reviews from "@/sections/Reviews";
import Plans from "@/sections/Plans";
import Meeting from "@/sections/Meeting";
import FAQs from "@/sections/FAQs";
import Contact from "@/sections/Contact";

function Home() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Reviews />
      <Plans />
      <Meeting />
      <FAQs />
      <Contact />
    </>
  );
}

export default Home;
