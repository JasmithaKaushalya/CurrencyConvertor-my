import React from 'react'

export default function MainPage() {
  return (
    <div>
        <h1 className=" lg:mx-32 text-4xl font-bold text-green-500">Convert Your Currencies Today</h1>
        <p className=' lg:mx-32 opacity-40 py-6'>Convert Your Currencies Today is a fast, reliable, and user-friendly 
            currency conversion platform designed to help you exchange currencies 
            with ease. Whether you're traveling abroad, shopping internationally, 
            making business transactions, or simply tracking exchange rates, our tool 
            provides real-time currency conversions for over 150 world currencies.</p>

        <div className='mt-5 flex items-center justify-center flex-col'>
          <section>
            <form>
              <div>
                <label for="email" className="block mb-2.5 text-sm font-medium text-heading">Date</label>
                <input type="Date" id="email" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" required />  
              </div>
            </form>
          </section>
        </div>
    </div>
  )
}
