import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";

export default function VoiceDebug() {
  const [voiceMode, setVoiceMode] = useState(false);
  const [listening, setListening] = useState(false);
  const [command, setCommand] = useState("No command yet.");
  const [status, setStatus] = useState("Idle");
  const [debug, setDebug] = useState([]);
  const recognitionRef = useRef(null);

  const log = (msg) => {
    console.log(msg);
    setDebug((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      const msg = "❌ SpeechRecognition not supported in this browser.";
      console.warn(msg);
      setStatus(msg);
      log(msg);
      return;
    }

    const recog = new SpeechRecognition();
    recog.lang = "en-US";
    recog.continuous = true; // 🔄 keep listening until stopped
    recog.interimResults = true; // 🧠 capture partial speech

    recog.onstart = () => {
      log("🎤 Recognition started");
      setStatus("Listening...");
    };

    recog.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
      }
      transcript = transcript.trim();
      log("✅ Recognized: " + transcript);
      setCommand(transcript || "Listening...");
      setStatus("Command updating...");
    };

    recog.onerror = (event) => {
      const errMsg = `❌ Error: ${event.error}`;
      log(errMsg);
      setStatus(errMsg);
      setListening(false);
    };

    recog.onend = () => {
      log("🛑 Recognition ended");
      setListening(false);
      setStatus("Stopped");
    };

    recognitionRef.current = recog;
    log("✅ SpeechRecognition initialized");
  }, []);

  const toggleListening = async () => {
    const recog = recognitionRef.current;
    if (!recog) {
      log("⚠️ Recognition not initialized");
      setStatus("Not initialized");
      return;
    }

    if (listening) {
      recog.stop();
      setListening(false);
      setStatus("Manually stopped");
      log("🛑 Stopped manually");
    } else {
      try {
        log("🎙️ Requesting mic access...");
        await navigator.mediaDevices.getUserMedia({ audio: true });
        recog.start();
        setListening(true);
        setStatus("🎧 Listening...");
        setCommand("Listening...");
        log("🎧 Started listening");
      } catch (err) {
        log("🚫 Mic permission denied: " + err.message);
        setStatus("Mic permission denied");
      }
    }
  };

  return (
    <div className="p-6 space-y-5 max-w-lg mx-auto text-center border rounded-2xl shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-3">
        🎙️ Voice Command Debugger (Enhanced)
      </h2>

      {/* Voice Mode + Mic Controls */}
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={() => setVoiceMode((v) => !v)}
          className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          title="Toggle Voice Mode"
        >
          {voiceMode ? (
            <Volume2 className="w-6 h-6 text-green-600" />
          ) : (
            <VolumeX className="w-6 h-6 text-gray-500" />
          )}
        </button>

        {voiceMode && (
          <button
            onClick={toggleListening}
            className={`p-3 rounded-full transition ${
              listening
                ? "bg-red-100 hover:bg-red-200"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            title={listening ? "Stop Listening" : "Start Listening"}
          >
            {listening ? (
              <MicOff className="w-6 h-6 text-red-600" />
            ) : (
              <Mic className="w-6 h-6 text-gray-700" />
            )}
          </button>
        )}
      </div>

      {/* Command & Status */}
      <div className="bg-gray-50 p-4 rounded-xl border text-gray-700 shadow-sm text-left">
        <p className="font-semibold text-sm text-gray-600">🎧 Status:</p>
        <p className="mb-2 text-blue-700">{status}</p>
        <p className="font-semibold text-sm text-gray-600">🗣️ Last Command:</p>
        <p className="text-gray-800">{command}</p>
      </div>

      {/* Debug Log */}
      <div className="bg-gray-900 text-left p-3 rounded-xl h-44 overflow-y-auto text-green-300 text-xs font-mono">
        {debug.map((d, i) => (
          <div key={i}>{d}</div>
        ))}
      </div>

      <p className="text-xs text-gray-400">
        ⚠️ Make sure microphone is allowed in browser settings.
      </p>
      <p className="text-[10px] text-gray-400">
        Browser: {navigator.userAgent}
      </p>
    </div>
  );
}
