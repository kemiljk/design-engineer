"use client";

import { useEffect } from "react";

const ConsoleFun = () => {
  useEffect(() => {
    console.log(
      "%cHey there adventurous one! 👋",
      "font-size: 2rem; font-weight: bold; color: #3b82f6",
    );
    console.log(
      "%cThought we'd find you here, you cheeky sod, you'll just have to wait!",
      "font-size: 1.5rem; font-weight: medium; color: #3b82f6",
    );
  }, []);

  return null;
};

export default ConsoleFun;

