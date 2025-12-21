"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface BannerContextType {
  isBannerVisible: boolean;
  bannerHeight: number;
  setBannerVisible: (visible: boolean) => void;
  setBannerHeight: (height: number) => void;
}

const BannerContext = createContext<BannerContextType>({
  isBannerVisible: false,
  bannerHeight: 0,
  setBannerVisible: () => {},
  setBannerHeight: () => {},
});

export function BannerProvider({ children }: { children: ReactNode }) {
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [bannerHeight, setBannerHeightState] = useState(0);

  const setBannerVisible = useCallback((visible: boolean) => {
    setIsBannerVisible(visible);
  }, []);

  const setBannerHeight = useCallback((height: number) => {
    setBannerHeightState(height);
  }, []);

  return (
    <BannerContext.Provider value={{ isBannerVisible, bannerHeight, setBannerVisible, setBannerHeight }}>
      {children}
    </BannerContext.Provider>
  );
}

export function useBanner() {
  return useContext(BannerContext);
}
