import BannerMainPage from "@/app/component/banner/BannerMainPage";
import AboutUs from "@/app/component/firstPage/aboutUs";
import MiddlePart from "@/app/component/firstPage/middlePart";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <BannerMainPage/>
    <MiddlePart/>
    <AboutUs/>
    </>
  );
}
