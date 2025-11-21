// src/hooks/useCurrencyInfo.js
import { useEffect, useState } from "react";

/**
 * useCurrencyInfo(currency)
 * - Tries the GitHub CDN first (the one you used)
 * - If CDN fails (404 / non-json), falls back to exchangerate.host
 * - Returns an object of rates keyed by currency code (lowercase),
 *   e.g. { inr: 82.3, eur: 0.92 }
 */
export default function useCurrencyInfo(currency) {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currency) {
      setData({});
      return;
    }

    let mounted = true;
    setLoading(true);
    setError(null);

    const cdnUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency.toLowerCase()}.json`;
    const fallbackUrl = `https://api.exchangerate.host/latest?base=${currency.toUpperCase()}`;

    const parseCdnResponse = async (res) => {
      // CDN returns { <base>: { "inr": 82.3, ... } }
      const json = await res.json();
      return json[currency.toLowerCase()] || {};
    };

    const parseFallbackResponse = async (res) => {
      // exchangerate.host returns { base: "USD", rates: { "INR": 82.3, ... } }
      const json = await res.json();
      const rates = json.rates || {};
      // normalize to lowercase keys
      const normalized = {};
      Object.keys(rates).forEach((k) => {
        normalized[k.toLowerCase()] = rates[k];
      });
      return normalized;
    };

    (async () => {
      try {
        // Try CDN first
        const r1 = await fetch(cdnUrl);
        if (r1.ok && r1.headers.get("content-type")?.includes("application/json")) {
          const parsed = await parseCdnResponse(r1);
          if (mounted) {
            setData(parsed);
            setLoading(false);
            return;
          }
        } else {
          // CDN returned non-OK or non-JSON — read text for logging (won't throw)
          const text = await r1.text().catch(() => "");
          console.warn("CDN fetch not OK or not JSON:", r1.status, text.slice(0, 200));
        }

        // Fallback: exchangerate.host
        const r2 = await fetch(fallbackUrl);
        if (r2.ok && r2.headers.get("content-type")?.includes("application/json")) {
          const parsed = await parseFallbackResponse(r2);
          if (mounted) {
            setData(parsed);
            setLoading(false);
            return;
          }
        } else {
          const text = await r2.text().catch(() => "");
          throw new Error(`Fallback fetch failed: ${r2.status} ${text.slice(0,200)}`);
        }
      } catch (err) {
        console.error("Error fetching currency:", err);
        if (mounted) {
          setError(err.message || "Failed to fetch rates");
          setData({});
          setLoading(false);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, [currency]);

  return { rates: data, loading, error }; // return object so caller can access rates and status
}
