import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AiChatBot from "../pages/AiChatBot";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { profileService } from "../services/authService";
import { MessageCircle, X } from "lucide-react";

const MainLayout = () => {
  const dispatch = useDispatch();
  const [isChatOpen, setIsChatOpen] = useState(false);

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
      <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/30 px-3 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.05)] backdrop-blur-xl sm:px-4 sm:py-4">
        <Navbar />
      </header>

      <main>
        <Outlet />
      </main>

      <Footer />

      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-4 right-4 z-[999] flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-orange-600 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
        >
          <MessageCircle size={22} />
        </button>
      )}

      {isChatOpen && (
        <div className="fixed inset-0 z-[1000] bg-black/40 backdrop-blur-sm">
          <button
            onClick={() => setIsChatOpen(false)}
            className="fixed right-3 top-3 z-[1002] flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-700 shadow-md hover:bg-gray-100 sm:right-5 sm:top-5 sm:h-10 sm:w-10"
          >
            <X size={20} />
          </button>

          <div className="flex h-dvh w-full items-center justify-center p-0 sm:p-4">
            <div className="h-dvh w-full overflow-hidden  sm:h-[92vh] sm:w-[92%]  md:w-[75%] lg:w-[55%] xl:w-[40%] 2xl:w-[30%]">
              <AiChatBot />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
