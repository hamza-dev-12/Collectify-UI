import React from "react";
import { useLocation } from "react-router-dom";

const CollectifyLogo = ({ size = "medium" }) => {
  const sizes = {
    small: { iconSize: 20, fontSize: "text-lg" },
    medium: { iconSize: 24, fontSize: "text-xl" },
    large: { iconSize: 32, fontSize: "text-2xl" },
  };

  const currentSize = sizes[size];
  const location = useLocation();

  return (
    <div className="flex items-center space-x-3">
      {/* Logo Icon - Stack of collected items */}
      <div className="relative">
        <div
          className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-lg transform rotate-12 opacity-90"
          style={{ width: currentSize.iconSize, height: currentSize.iconSize }}
        >
          <div className="absolute inset-1 bg-white/20 rounded backdrop-blur-sm"></div>
        </div>
        <div
          className="absolute -top-1 -left-1 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-md transform -rotate-6 opacity-80"
          style={{
            width: currentSize.iconSize * 0.8,
            height: currentSize.iconSize * 0.8,
          }}
        >
          <div className="absolute inset-1 bg-white/15 rounded backdrop-blur-sm"></div>
        </div>
        <div
          className="absolute -top-2 -left-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow transform rotate-3 opacity-70"
          style={{
            width: currentSize.iconSize * 0.6,
            height: currentSize.iconSize * 0.6,
          }}
        >
          <div className="absolute inset-1 bg-white/10 rounded backdrop-blur-sm"></div>
        </div>
      </div>

      {/* Logo Text */}
      <div className="flex items-center">
        <span
          className={`font-bold ${currentSize.fontSize} ${
            location.pathname.includes("group")
              ? "text-gray-900"
              : "text-gray-900"
          } tracking-tight`}
        >
          Collect
        </span>
        <span
          className={`font-bold ${currentSize.fontSize} text-blue-600 tracking-tight`}
        >
          ify
        </span>
      </div>
    </div>
  );
};

// Demo component with light navbar on dark background
const LightNavbarDemo = () => {
  return (
    <div className=" bg-gray-900">
      <nav
        className={`${
          location.pathname.includes("group") ? "bg-white" : "bg-white"
        } shadow-lg px-6 py-4 flex items-center justify-between border-b border-gray-200`}
      >
        <CollectifyLogo size="medium" />
      </nav>
    </div>
  );
};

export default LightNavbarDemo;
