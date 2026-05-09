import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { profileService } from "./services/authService";

const App = () => {
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
console.log("app");

  return (
    <div className="min-h-screen bg-white">
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

      <Outlet />

      <Footer />
    </div>
  );
};

export default App;
