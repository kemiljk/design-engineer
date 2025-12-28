"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SupportedCurrency } from "@/lib/currency";

interface CurrencyInfo {
  code: string;
  symbol: string;
  name: string;
}

interface CurrencyData {
  base: string;
  date: string;
  rates: Record<string, number>;
  currencies: CurrencyInfo[];
}

interface CurrencySelectorProps {
  onCurrencyChange: (currency: SupportedCurrency, rates: Record<string, number>) => void;
}

// Detect user's likely currency from browser
function detectUserCurrency(): SupportedCurrency {
  if (typeof window === "undefined") return "GBP";
  
  const locale = navigator.language || "en-GB";
  
  const localeMap: Record<string, SupportedCurrency> = {
    "en-US": "USD",
    "en-GB": "GBP",
    "en-AU": "AUD",
    "en-CA": "CAD",
    "en-NZ": "NZD",
    "en-SG": "SGD",
    "en-HK": "HKD",
    "en-IN": "INR",
    "de-DE": "EUR",
    "de-AT": "EUR",
    "fr-FR": "EUR",
    "es-ES": "EUR",
    "it-IT": "EUR",
    "nl-NL": "EUR",
    "pt-PT": "EUR",
    "ja-JP": "JPY",
    "sv-SE": "SEK",
    "de-CH": "CHF",
    "fr-CH": "CHF",
    "pl-PL": "PLN",
    "pt-BR": "BRL",
    "es-MX": "MXN",
  };
  
  return localeMap[locale] || "GBP";
}

export function CurrencySelector({ onCurrencyChange }: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<SupportedCurrency>("GBP");
  const [currencyData, setCurrencyData] = useState<CurrencyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRates() {
      try {
        const response = await fetch("/api/currency");
        if (response.ok) {
          const data: CurrencyData = await response.json();
          setCurrencyData(data);
          
          // Auto-detect and set user's currency
          const detectedCurrency = detectUserCurrency();
          if (data.rates[detectedCurrency]) {
            setSelectedCurrency(detectedCurrency);
            onCurrencyChange(detectedCurrency, data.rates);
          } else {
            onCurrencyChange("GBP", data.rates);
          }
        }
      } catch (error) {
        console.error("Failed to fetch currency rates:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchRates();
  }, [onCurrencyChange]);

  const handleSelect = (currency: SupportedCurrency) => {
    setSelectedCurrency(currency);
    setIsOpen(false);
    if (currencyData) {
      onCurrencyChange(currency, currencyData.rates);
    }
  };

  const selectedInfo = currencyData?.currencies.find(c => c.code === selectedCurrency);

  if (isLoading || !currencyData) {
    return (
      <div className="flex items-center gap-2 text-sm text-neutral-500">
        <Globe className="h-4 w-4 animate-pulse" />
        <span>Loading currencies...</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-none border border-neutral-200 bg-white px-3 py-2 text-sm transition-colors hover:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600"
      >
        <Globe className="h-4 w-4 text-neutral-500" />
        <span className="font-medium">{selectedInfo?.symbol || selectedCurrency}</span>
        <span className="text-neutral-500">{selectedCurrency}</span>
        <ChevronDown className={cn(
          "h-4 w-4 text-neutral-400 transition-transform",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute right-0 top-full z-50 mt-1 max-h-64 w-56 overflow-auto rounded-none border border-neutral-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
            {currencyData.currencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => handleSelect(currency.code as SupportedCurrency)}
                className={cn(
                  "flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-700",
                  selectedCurrency === currency.code && "bg-neutral-100 dark:bg-neutral-700"
                )}
              >
                <span className="w-8 font-medium">{currency.symbol}</span>
                <span className="flex-1">{currency.name}</span>
                <span className="text-neutral-400">{currency.code}</span>
              </button>
            ))}
          </div>
        </>
      )}

      {currencyData.date && selectedCurrency !== "GBP" && (
        <p className="mt-1 text-xs text-neutral-400">
          Rates from {currencyData.date}. Prices charged in GBP.
        </p>
      )}
    </div>
  );
}
