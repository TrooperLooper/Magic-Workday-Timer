import { useState, useEffect } from "react";

interface CircleConfigValues {
  radius: number;
  center: number;
  dotSize: number;
}

function getConfigForWidth(width: number): CircleConfigValues {
  if (width <= 480) {
    return { radius: 70, center: 140, dotSize: 12 };
  } else if (width <= 768) {
    return { radius: 80, center: 160, dotSize: 14 };
  } else {
    return { radius: 100, center: 200, dotSize: 18 };
  }
}

export function useCircleConfig(): CircleConfigValues {
  const [config, setConfig] = useState<CircleConfigValues>(
    getConfigForWidth(window.innerWidth)
  );

  useEffect(() => {
    const updateConfig = () => {
      setConfig(getConfigForWidth(window.innerWidth));
    };

    window.addEventListener("resize", updateConfig);
    return () => window.removeEventListener("resize", updateConfig);
  }, []);

  return config;
}
