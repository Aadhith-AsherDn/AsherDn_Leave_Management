import { useState } from "react";

const Navbar = () => {
  const [isPunchedIn, setIsPunchedIn] = useState(false);

  const handlePunch = () => {
    setIsPunchedIn(!isPunchedIn);
  };

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-slate-900 flex items-center justify-end px-6">        
            <button
                onClick={handlePunch}
                className={`px-5 py-2 rounded-lg text-white font-semibold transition
                ${
                isPunchedIn
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-green-600 hover:bg-green-700"
                }`}
            >
                {isPunchedIn ? "Punch Out" : "Punch In"}
            </button>

    </header>
  );
};

export default Navbar;