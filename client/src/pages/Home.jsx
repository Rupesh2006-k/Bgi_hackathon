import {
  BarChart3,
  Bell,
  Bot,
  CheckCircle,
  MapPin,
  TrendingUp,
} from "lucide-react";
import HeroSection from "../components/HeroSection";

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      <section className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-orange-50 px-4 sm:px-5 py-5">
        <HeroSection />

        {/* AI Feed */}
        <div className="mx-auto mt-10 sm:mt-16 max-w-7xl rounded-2xl bg-black text-white p-5 sm:p-8 lg:p-10 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-center">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 shrink-0 rounded-xl bg-orange-500 flex items-center justify-center">
                <TrendingUp size={22} />
              </div>
              <div>
                <h3 className="font-semibold">Live Intelligence Feed</h3>
                <p className="text-xs text-gray-400">
                  Processing thousands of grievances using AI.
                </p>
              </div>
            </div>

            <div className="text-left md:text-center">
              <h3 className="text-2xl sm:text-3xl font-bold">0.4s</h3>
              <p className="text-xs text-gray-400">Average Response Time</p>
            </div>

            <div className="text-left md:text-center">
              <h3 className="text-2xl sm:text-3xl font-bold">98.4%</h3>
              <p className="text-xs text-gray-400">Classification Accuracy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Built Section */}
      <section className="bg-orange-50/40 px-4 sm:px-5 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Built for Modern Governance
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-500">
              Leveraging AI technology to improve citizen grievance management.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Big Card */}
            <div className="lg:col-span-2 rounded-2xl bg-white border border-orange-100 p-5 sm:p-6 shadow-sm">
              <div className="h-11 w-11 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center mb-5">
                <Bot size={22} />
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold mb-3">
                Intelligent Classification
              </h3>

              <p className="text-sm sm:text-base text-gray-500 mb-6">
                Our AI-powered system analyzes each complaint and automatically
                routes it to the appropriate department for faster and more
                accurate resolution.
              </p>

              <div className="h-40 sm:h-44 rounded-xl bg-gradient-to-br from-black via-orange-700 to-orange-300 flex items-end justify-center p-5 sm:p-8">
                <div className="flex items-end gap-1">
                  <div className="h-10 w-10 sm:w-16 bg-white/80" />
                  <div className="h-16 w-10 sm:w-16 bg-white/90" />
                  <div className="h-24 w-10 sm:w-16 bg-white" />
                  <div className="h-12 w-10 sm:w-16 bg-white/70" />
                </div>
              </div>
            </div>

            {/* Urgency Card */}
            <div className="rounded-2xl bg-white border border-orange-100 p-5 sm:p-6 shadow-sm">
              <div className="h-11 w-11 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center mb-5">
                <Bell size={22} />
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold mb-3">
                Urgent Problem Detection
              </h3>

              <p className="text-sm sm:text-base text-gray-500">
                The system detects urgent problems and ensures quick response
                with immediate escalation for faster resolution.
              </p>
            </div>

            {/* Small Card */}
            <div className="rounded-2xl bg-white border border-orange-100 p-5 sm:p-6 shadow-sm">
              <div className="h-11 w-11 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center mb-5">
                <MapPin size={22} />
              </div>

              <h3 className="text-xl font-semibold mb-3">
                Auto Location Detection
              </h3>

              <p className="text-sm text-gray-500">
                The system automatically detects the user’s location and routes
                complaints to the nearest relevant department for quicker
                resolution.
              </p>
            </div>

            {/* Transport Card */}
            <div className="lg:col-span-2 rounded-2xl bg-white border border-orange-100 p-5 sm:p-6 shadow-sm">
              <div className="h-11 w-11 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center mb-5">
                <BarChart3 size={22} />
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold mb-3">
                Transparent Tracking
              </h3>

              <p className="text-sm text-gray-500 mb-6">
                Real-time tracking allows citizens to monitor complaint progress
                with complete transparency and clear status updates.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-xl border border-orange-100 bg-orange-50 p-4">
                  <CheckCircle className="text-orange-500 shrink-0" size={20} />
                  <span className="text-sm font-semibold">
                    Received Municipal Complaint
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-orange-100 bg-white p-4">
                  <CheckCircle className="text-black shrink-0" size={20} />
                  <span className="text-sm font-semibold">
                    AI Review Classification Progress
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-black px-4 sm:px-5 py-12 sm:py-14 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl sm:text-4xl font-bold">450k+</h3>
            <p className="mt-2 text-xs uppercase text-gray-400">
              Complaints Resolved
            </p>
          </div>

          <div>
            <h3 className="text-3xl sm:text-4xl font-bold">12</h3>
            <p className="mt-2 text-xs uppercase text-gray-400">
              Active Departments
            </p>
          </div>

          <div>
            <h3 className="text-3xl sm:text-4xl font-bold">65%</h3>
            <p className="mt-2 text-xs uppercase text-gray-400">
              Processing Speed
            </p>
          </div>

          <div>
            <h3 className="text-3xl sm:text-4xl font-bold">4.9</h3>
            <p className="mt-2 text-xs uppercase text-gray-400">Trust Rating</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
