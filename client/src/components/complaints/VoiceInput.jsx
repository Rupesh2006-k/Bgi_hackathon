import { Mic } from "lucide-react";
import { useState, useRef } from "react";

const VoiceInput = ({ setDescription }) => {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);
  const isRecordingRef = useRef(false);

  const startRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      console.log(transcript);
      
      setDescription((prev) => `${prev} ${transcript}`.trim());
    };

    recognition.onerror = (event) => {
      console.log("Speech error:", event.error);

      if (event.error === "network" && isRecordingRef.current) {
        setTimeout(() => {
          if (isRecordingRef.current) startRecognition();
        }, 500);
        return;
      }

      isRecordingRef.current = false;
      setIsRecording(false);
    };

    recognition.onend = () => {
      if (isRecordingRef.current) {
        setTimeout(() => startRecognition(), 200);
      }
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const handleVoice = () => {
    if (!isRecording) {
      isRecordingRef.current = true;
      setIsRecording(true);
      startRecognition();
    } else {
      isRecordingRef.current = false;
      setIsRecording(false);
      recognitionRef.current?.stop();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleVoice}
        className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold transition ${
          isRecording ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-700"
        }`}
      >
        <Mic size={14} />
        {isRecording ? "Stop" : "Voice Input"}
      </button>

      {isRecording && (
        <div className="flex h-4 items-end gap-0.5">
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="w-[3px] bg-red-500 animate-wave"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VoiceInput;

// import { Mic } from "lucide-react";
// import { useState, useRef } from "react";

// const VoiceInput = ({ setDescription }) => {
//   const [isRecording, setIsRecording] = useState(false);
//   const recognitionRef = useRef(null);

//   const handleVoice = () => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert("Voice not supported in this browser");
//       return;
//     }

//     if (!isRecording) {
//       const recognition = new SpeechRecognition();

//       recognition.lang = "en-IN";
//       recognition.continuous = true;
//       recognition.interimResults = false;

//       recognition.onresult = (event) => {
//         const transcript =
//           event.results[event.results.length - 1][0].transcript;

//         setDescription((prev) => `${prev} ${transcript}`.trim());
//       };

//       recognition.onerror = (error) => {
//         console.log("Speech error:", error);
//         setIsRecording(false);
//       };

//       recognition.onend = () => {
//         setIsRecording(false);
//       };

//       recognition.start();
//       recognitionRef.current = recognition;
//       setIsRecording(true);
//     } else {
//       recognitionRef.current?.stop();
//       setIsRecording(false);
//     }
//   };

//   return (
//     <div className="flex items-center gap-2">
//       <button
//         type="button"
//         onClick={handleVoice}
//         className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold transition ${
//           isRecording
//             ? "bg-red-100 text-red-600"
//             : "bg-gray-100 text-gray-700"
//         }`}
//       >
//         <Mic size={14} />
//         {isRecording ? "Stop" : "Voice Input"}
//       </button>

//       {isRecording && (
//         <div className="flex h-4 items-end gap-0.5">
//           {[...Array(8)].map((_, i) => (
//             <span
//               key={i}
//               className="w-[3px] bg-red-500 animate-wave"
//               style={{ animationDelay: `${i * 0.1}s` }}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default VoiceInput;
