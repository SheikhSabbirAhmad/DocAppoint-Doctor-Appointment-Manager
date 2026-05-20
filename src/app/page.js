import Banner from "@/components/Banner";
import Testimonials from "@/components/Testimonials";
import TopRatedDoc from "@/components/TopRatedDoc";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <TopRatedDoc></TopRatedDoc>
      <WhyChooseUs></WhyChooseUs>
      <Testimonials></Testimonials>
    </div>
  );
}
