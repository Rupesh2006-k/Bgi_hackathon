import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { profileService } from "../services/authService";

const MainLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await profileService(dispatch);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProfile();
  }, [dispatch]);
  return (
    <div className="min-h-screen bg-[#faf7f8]">
      <header
        className="
          sticky top-0 z-50 w-full px-4 py-4
          bg-white/30 backdrop-blur-xl
          border-b border-white/20
          shadow-[0_8px_32px_rgba(0,0,0,0.05)]
        "
      >
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
