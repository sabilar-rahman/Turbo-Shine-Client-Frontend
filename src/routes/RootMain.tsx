import ScrollToTop from "@/pages/BonusSection/ScrollToTop";

import Footer from "@/pages/shared/Footer";
import Navbar from "@/pages/shared/Navbar";
import { Outlet } from "react-router-dom";

const RootMain = () => {
  return (
    <div>
      <div className=" container mx-auto ">
        <Navbar />
      </div>

      <Outlet />
      <ScrollToTop />

      <Footer />
    </div>
  );
};

export default RootMain;
