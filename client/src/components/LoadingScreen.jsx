import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [showColdStartMessage, setShowColdStartMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowColdStartMessage(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="flex flex-col items-center text-center max-w-sm">
        <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-6" />

        <p className="text-slate-700 font-medium">
          {showColdStartMessage ? "Waking up the server…" : "Loading…"}
        </p>

        {showColdStartMessage && (
          <p className="text-slate-400 text-sm mt-2">
            Our free hosting puts the server to sleep after a bit of
            inactivity. It's waking up now — this can take up to a minute
            on the first load, and it'll be quick after that.
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;