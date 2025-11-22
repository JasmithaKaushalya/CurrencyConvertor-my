import React ,{useEffect, useState} from 'react';
import axios from "axios";


export default function MainPage() {

  //states for the form field
  const [date, setDate] = useState(""); // Changed from null to ""
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [ammountInSourceCurrency, setAmmountInSourceCurrency] = useState("");
  const [currencies , setCurrencies] = useState([]);
  const [convertedAmount, setConvertedAmount] = useState(null);

  //handle submit method
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Submitting:", {date, sourceCurrency, targetCurrency, ammountInSourceCurrency});
    
    try {
      const response = await axios.get("http://localhost:5001/convert", {
        params: {
          date,
          sourceCurrency,
          targetCurrency,
          ammountInSourceCurrency,
        },
      });
      console.log("Response:", response.data);
      setConvertedAmount(response.data.convertedAmount);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
    }
  };

  //get all currency names
  useEffect(() => {
    const getCurrencyNames = async () => {
      try {
        const response = await axios.get('http://localhost:5001/currencies');
        console.log("Frontend received:", response.data);
        setCurrencies(response.data);
      } catch (err) {
        console.error("Frontend error:", err);
      }
    };
    
    getCurrencyNames();
  }, []);
    
  return (
    <div>
        <h1 className="lg:mx-32 text-5xl font-bold text-green-500 text-center">Convert Your Currencies Today</h1>
        <p className=' lg:mx-32 opacity-80 font-bold py-6 text-center'>Convert Your Currencies Today is a fast, reliable, and user-friendly 
            currency conversion platform designed to help you exchange currencies 
            with ease. Whether you're traveling abroad, shopping internationally, 
            making business transactions, or simply tracking exchange rates, our tool 
            provides real-time currency conversions for over 150 world currencies.</p>

        <div className="w-full max-w-lg mx-auto px-4">
          <section>
          <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <label htmlFor="date" className="block mb-2.5 text-sm font-medium text-heading">Date</label>
                <input 
                  onChange={(e) => setDate(e.target.value)} 
                  type="date" 
                  id="date" 
                  name="date" 
                  value={date}
                  className="px-4 py-3.5 bg-gray-50 border-2 border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white hover:border-green-100 hover:bg-white block w-full shadow-sm transition-all duration-200" 
                  required 
                />  
              </div>
              
              <div className='mb-4'>
                <label htmlFor="source" className="block mb-2.5 text-sm font-medium text-heading">Source Currency</label>
                <select 
                  onChange={(e) => setSourceCurrency(e.target.value)} 
                  id="source" 
                  name="source" 
                  value={sourceCurrency} 
                  className="bg-gray-50 border-2 border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white hover:border-green-100 hover:bg-white block w-full px-4 py-3.5 shadow-sm transition-all duration-200 cursor-pointer" 
                  required>
                <option value="">Select your source currency</option>
                  {Object.keys(currencies).map((currency) => (
                    <option className='p-1' key={currency} value={currency}>
                      {currencies[currency]}
                    </option>
                  ))}
          </select>  
        </div>

        <div className='mb-4'>
          <label htmlFor="target" className="block mb-2.5 text-sm font-medium text-heading">Select Target Currency</label>
          <select 
            onChange={(e) => setTargetCurrency(e.target.value)} 
            id="target" 
            name="target" 
            value={targetCurrency} 
            className="bg-gray-50 border-2 border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white hover:border-green-100 hover:bg-white block w-full px-4 py-3.5 shadow-sm transition-all duration-200 cursor-pointer" 
            required>
            <option value="">Select your target currency</option>
              {Object.keys(currencies).map((currency) => (
            <option className='p-1' key={currency} value={currency}>
              {currencies[currency]}
            </option>
            ))}
          </select>  
        </div>

              <div className='mb-4'>
                <label htmlFor="ammount" className="block mb-2.5 text-sm font-medium text-heading">Enter The Amount</label>
                <input 
                  onChange={(e) => setAmmountInSourceCurrency(e.target.value)} 
                  id="ammount" 
                  name="ammount" 
                  type="number" 
                  value={ammountInSourceCurrency}
                  className="px-4 py-3.5 bg-gray-50 border-2 border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white hover:border-green-100 hover:bg-white block w-full shadow-sm transition-all duration-200" 
                  required 
                />  
              </div>

              <button className='bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md'>Get Your Result</button>
            </form>

            {convertedAmount && (
              <div className="mt-6 p-6 bg-green-100 rounded-xl border-2 border-green-200">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Conversion Result:</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {ammountInSourceCurrency} {sourceCurrency} = {convertedAmount} {targetCurrency}
                </p>
                <p className="text-xs text-gray-500 mt-2">Date: {date}</p>
              </div>
            )}
          </section>
        </div>
        <div class = "wrapper"></div>
    </div>
  )
}