import React, {useId} from 'react'

function InputBox({
  label,
  amount,
  onAmountChange,
  currency,
  onCurrencyChange,
  currencyOptions = [],
  disabled = false
}) 
{
  const amountInputId = useId()
  return (

    <div className="bg-white p-4 rounded-lg flex items-center justify-between gap-4 shadow">
      
      {/* Amount Input */}
      <div className="flex flex-col w-1/2">
        <label htmlFor='amountInputId' className="text-gray-600 text-sm">{label}</label>
        <input
          id = {amountInputId}
          type="number"
          value={amount}
          onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
          className="border rounded-lg px-3 py-2 mt-1 outline-none text-black"
          disabled={disabled}
        />
      </div>

      {/* Currency Dropdown */}
      <div className="flex flex-col w-1/2">
        <label className="text-gray-600 text-sm">Currency</label>
        <select
          value={currency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          className="border rounded-lg px-3 py-2 mt-1 outline-none text-black bg-gray-100"
        >
          {currencyOptions.map((cur) => (
            <option key={cur} value={cur}>
              {cur.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

    </div>
  );
}

export default InputBox;
