import { Clock, ShieldCheck } from "lucide-react";

const DetectionPreview = () => {
  return (
    <div className="relative h-44 overflow-hidden rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 shadow-sm">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute left-20 top-16 h-20 w-28 rotate-12 rounded-md bg-gray-300" />
        <div className="absolute right-12 top-20 h-20 w-28 -rotate-12 rounded-md bg-gray-400" />
        <div className="absolute right-20 top-8 h-14 w-14 rounded-full border-8 border-gray-600" />
      </div>

      <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-md bg-white px-3 py-2 text-xs font-bold text-gray-700">
        <span className="h-2 w-2 rounded-full bg-red-500" />
        DETECTED: GARBAGE
      </div>

      <div className="absolute right-4 top-4 rounded-full bg-white/10 p-2">
        <ShieldCheck size={22} className="text-white" />
      </div>

      <div className="absolute bottom-4 right-4 flex items-center gap-1 text-xs text-white/70">
        <Clock size={13} />
        AI Scan
      </div>
    </div>
  );
};

export default DetectionPreview;
