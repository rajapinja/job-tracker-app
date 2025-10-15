// src/components/VoiceModeToggle.jsx
import { useEffect, useState, useRef } from "react";
import { Mic, MicOff } from "lucide-react";

export default function VoiceModeToggle({ onCommand }) {
  const [enabled, setEnabled] = useState(false);
  const [status, setStatus] = useState("Voice mode off");
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recog = new SpeechRecognition();
    recog.lang = "en-US";
    recog.continuous = true;
    recog.interimResults = false;

    recog.onstart = () => setStatus("🎙️ Listening...");
    recog.onerror = (e) => {
      console.error("Speech error:", e.error);
      if (e.error === "no-speech") setStatus("⚠️ No speech detected, retrying...");
    };
    recog.onend = () => {
      if (enabled) {
        setStatus("🎧 Waiting for next command...");
        recog.start(); // restart automatically
      }
    };

    recog.onresult = (e) => {
      const transcript = e.results[e.resultIndex][0].transcript.toLowerCase().trim();
      console.log("🎤 Heard:", transcript);
      setStatus(`🗣️ ${transcript}`);
      onCommand?.(transcript); // send command to parent
    };

    recog.start();
    recognitionRef.current = recog;

    return () => recog.abort();
  }, [enabled, onCommand]);

  const toggleVoice = () => {
    if (enabled) {
      recognitionRef.current?.abort();
      setStatus("🔇 Voice mode off");
      setEnabled(false);
    } else {
      setEnabled(true);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={toggleVoice}
        className={`p-1.5 rounded-full shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
          enabled ? "bg-green-100" : "bg-gray-100"
        }`}
        title={enabled ? "Stop Voice Mode" : "Start Voice Mode"}
      >
        {enabled ? (
          <Mic className="w-4 h-4 text-green-600" />
        ) : (
          <MicOff className="w-4 h-4 text-gray-600" />
        )}
      </button>
      <span className="text-xs text-gray-500 dark:text-gray-300">{status}</span>
    </div>
  );
}
