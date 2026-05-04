import AIAnalysisCard from "../components/complaints/AIAnalysisCard";
import ComplaintForm from "../components/complaints/ComplaintForm";
import DetectionPreview from "../components/complaints/DetectionPreview";
import SubmissionSummary from "../components/complaints/SubmissionSummary";

const SubmitComplaint = () => {
  return (
    <div className="min-h-screen bg-[#faf7f8] p-4 md:p-8">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[1.25fr_0.9fr]">
        <ComplaintForm />

        <div className="space-y-5 ">
          <AIAnalysisCard />
          <SubmissionSummary />
          <DetectionPreview />
        </div>
      </div>
    </div>
  );
};

export default SubmitComplaint;
