import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-orange-50/30 px-6 py-22.5">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(#1e2a4218_1px,transparent_1px),linear-gradient(90deg,#1e2a4218_1px,transparent_1px)] bg-size-[40px_40px]" />

      {/* Glow Orbs */}
      <div className="absolute -top-16 left-[20%] z-0 h-100 w-100 rounded-full bg-orange-500/10 blur-[80px]" />
      <div className="absolute top-10 right-[10%] z-0 h-75 w-75 rounded-full bg-orange-400/10 blur-[80px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 pt-10 lg:grid-cols-2 lg:pt-20">
        {/* Left Content */}
        <div className="text-center lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm">
            <Sparkles size={14} className="text-orange-500" />
            AI Based Citizen Grievance Platform
          </div>

          <h1 className="text-4xl font-bold leading-tight text-gray-950 md:text-6xl">
            AI-Based Citizen <br />
            <span className="italic text-orange-500">
              Grievance Classification
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-gray-600 lg:mx-0">
            Transforming public administration through intelligent automation,
            instant complaint classification, priority detection, and smart
            citizen complaint routing.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            <Link
              to="/submit"
              className="rounded-md bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
            >
              Submit Your Complaint
            </Link>

            <Link
              to="/dashboard"
              className="rounded-md border border-orange-300 bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-orange-50"
            >
              Dashboard
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -right-5 -top-5 z-0 h-28 w-28 rotate-12 rounded-3xl bg-orange-300/50" />

          <div className="relative z-10 rounded-3xl border border-orange-200 bg-white p-4 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80"
              alt="Modern city"
              className="h-[260px] w-full rounded-2xl object-cover sm:h-[320px md:h-[360px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
