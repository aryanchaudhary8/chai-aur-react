// src/App.jsx
import { useEffect, useState } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import "./App.css";

function App() {
  // state
  const [amount, setAmount] = useState(1);           // amount entered in "From"
  const [from, setFrom] = useState("usd");          // base currency
  const [to, setTo] = useState("inr");              // target currency
  const [convertedAmount, setConvertedAmount] = useState(0);

  // fetch currency rates for `from`
  const currencyInfo = useCurrencyInfo(from); // returns { inr: 82.3, eur: 0.92, ... }

  // build options safely (fallback to common list while loading)
  const options = Object.keys(currencyInfo || { usd: 1, inr: 1, eur: 1 });

  // background image path (local file you uploaded)
  const bgPath = "/mnt/data/Screenshot 2025-11-21 181003.png";

  // convert when amount, to or fetched rates change
  useEffect(() => {
    const rate = currencyInfo?.[to];
    if (!rate || isNaN(Number(amount))) {
      setConvertedAmount(0);
      return;
    }
    setConvertedAmount(Number(amount) * Number(rate));
  }, [amount, to, currencyInfo]);

  // swap base and target + swap amounts (keeps user intent)
  const swap = () => {
    setFrom((prevFrom) => {
      setTo(prevFrom);        // setTo uses old from
      return to;              // new from becomes previous to
    });
    // after swapping currencies, we want the "amount" to reflect previous converted value
    setAmount((prev) => {
      // if we had a valid convertedAmount, set it as new amount, else keep previous
      return convertedAmount || prev;
    });
    // convertedAmount will be recalculated by useEffect
  };

  // manual convert button (optional)
  const convert = () => {
    const rate = currencyInfo?.[to] ?? 1;
    setConvertedAmount(Number(amount) * Number(rate));
  };

  return (
    <div
      className="min-h-screen bg-gray-900 flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgPath})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* overlay for better contrast */}
      <div className="w-full min-h-screen bg-black/60 flex items-center justify-center">
        <div className="max-w-3xl w-full mx-4 p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg">
          <h1 className="text-2xl md:text-3xl font-semibold text-center mb-6 text-gray-800">
            Currency Converter
          </h1>

          <div className="space-y-4">
            {/* From (editable) */}
            <InputBox
              label="From"
              amount={amount}
              onAmountChange={setAmount}
              currency={from}
              onCurrencyChange={setFrom}
              currencyOptions={options}
              disabled={false}
            />

            {/* To (read-only converted amount) */}
            <InputBox
              label="To"
              amount={convertedAmount}
              onAmountChange={() => {}}
              currency={to}
              onCurrencyChange={setTo}
              currencyOptions={options}
              disabled={true}
            />

            {/* action buttons */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex gap-3">
                <button
                  onClick={swap}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
                >
                  Swap
                </button>

                <button
                  onClick={convert}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                >
                  Convert
                </button>
              </div>

              <div className="text-right text-sm text-gray-700">
                <div>Rate: {currencyInfo?.[to] ? Number(currencyInfo[to]).toFixed(6) : "—"}</div>
                <div className="text-xs text-gray-500">Source: public CDN rates</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
