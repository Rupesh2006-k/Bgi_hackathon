import { ShieldCheck, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerLinks = {
    PLATFORM: [
      { label: "Submit Grievance", path: "/submit" },
      { label: "Track Status", path: "/dashboard" },
      { label: "Dashboards", path: "/dashboard" },
    ],
    GOVERNANCE: [
      { label: "Open Data", path: "/" },
      { label: "Policy Hub", path: "/" },
      { label: "Department List", path: "/management" },
    ],
    RESOURCES: [
      { label: "User Guide", path: "/" },
      { label: "API Docs", path: "/" },
      { label: "Contact Us", path: "/" },
    ],
  };

  return (
    <footer className="relative overflow-hidden border-t border-orange-100 bg-gradient-to-br from-orange-50 via-white to-gray-100 px-4 py-12 text-gray-600 sm:px-6">
      {/* Glow Effects */}
      <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-orange-300/20 blur-3xl" />
      <div className="absolute -right-20 bottom-10 h-56 w-56 rounded-full bg-orange-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="mb-4 flex w-fit items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-[0_0_18px_rgba(249,115,22,0.35)]">
                <ShieldCheck size={21} className="text-white" />
              </div>

              <span className="text-xl font-extrabold tracking-tight text-black">
                Nagar<span className="text-orange-500">Mitra</span>
                <span className="ml-1 text-xs font-semibold tracking-wider text-gray-500">
                  .AI
                </span>
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-7 text-gray-600">
              Modernizing the connection between citizens and administration
              through ethical artificial intelligence.
            </p>

            <div className="mt-6 space-y-3 text-sm">
              <p className="flex items-center gap-3">
                <Mail size={16} className="text-orange-500" />
                support@nagarmitra.ai
              </p>
              <p className="flex items-center gap-3">
                <Phone size={16} className="text-orange-500" />
                +91 98765 43210
              </p>
              <p className="flex items-center gap-3">
                <MapPin size={16} className="text-orange-500" />
                Bhopal, Madhya Pradesh
              </p>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-5 text-xs font-bold tracking-[0.2em] text-gray-500">
                {title}
              </h3>

              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="group flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-orange-500"
                    >
                      <ArrowRight
                        size={14}
                        className="opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100"
                      />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-4 border-t border-orange-100 pt-6 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
          <p className="text-center font-semibold md:text-left">
            © 2026{" "}
            <Link to="/" className="font-bold text-black">
              Nagar<span className="text-orange-500">Mitra</span>
            </Link>{" "}
            Classification System. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-5 font-semibold">
            <Link to="/" className="transition hover:text-orange-500">
              Privacy
            </Link>
            <Link to="/" className="transition hover:text-orange-500">
              Terms
            </Link>
            <Link to="/" className="transition hover:text-orange-500">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
