import { Sparkles } from "lucide-react";

const AIAnalysisCard = () => {
  return (
    <div className="rounded-xl bg-slate-950 p-5 text-white shadow-sm">
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase text-cyan-300">
        <Sparkles size={15} />
        Live AI Analysis
      </div>

      <h3 className="text-lg font-semibold">Processing Prediction...</h3>
      <p className="mt-1 text-sm text-slate-300">
        Our neural network is categorizing your complaint in real-time for
        immediate routing.
      </p>
    </div>
  );
};

export default AIAnalysisCard;
