"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface BannerContextType {
  isBannerVisible: boolean;
  setBannerVisible: (visible: boolean) => void;
}

const BannerContext = createContext<BannerContextType>({
  isBannerVisible: false,
  setBannerVisible: () => {},
});

export function BannerProvider({ children }: { children: ReactNode }) {
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  const setBannerVisible = useCallback((visible: boolean) => {
    setIsBannerVisible(visible);
  }, []);

  return (
    <BannerContext.Provider value={{ isBannerVisible, setBannerVisible }}>
      {children}
    </BannerContext.Provider>
  );
}

export function useBanner() {
  return useContext(BannerContext);
}
