import React from 'react'

export default function Loginpage() {
  return (
    <>

      <div className="bg-[#f2f9fd] min-h-screen flex flex-col  ">
        <main className="flex-grow flex flex-col md:flex-row items-center justify-center px-4 py-12 max-w-6xl mx-auto w-full min-h-[calc(100vh-96px)] ">
        <div className="hidden md:block md:w-1/2 h-full">
          <img 
              alt="Happy diverse group of kids playing outdoors in colorful clothes, smiling and having fun in a sunny park with green grass and blue sky" 
              className="object-cover w-full h-full rounded-l-3xl shadow-lg opacity-85" 
              height="600" 
              src="/assets/images/banner.jpg" 
              width="600"
            />
        
        </div>
        <div className="w-full md:w-1/2 bg-white rounded-r-3xl rounded-l-3xl md:rounded-l-none shadow-lg p-10 max-w-md mx-auto ">
          <h1 className="text-3xl font-bold text-gray-500 mb-6 text-center">
          Welcome Back
          </h1>
          <form action="#" className="space-y-6" method="POST" >
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-2" >
            Full Name
            </label>
            <input  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7] focus:border-transparent transition" id="fullname" name="fullname" placeholder="Jhon Doe"  type="email"/>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-2" >
            Email address
            </label>
            <input autoComplete='email' className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7] focus:border-transparent transition" id="email" name="email" placeholder="you@example.com"  type="email"/>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-2" >
            Phone
            </label>
            <input autoComplete='phone' className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7] focus:border-transparent transition" id="phone" name="phone" placeholder="+12222222222"  type="email"/>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-2" >
            Password
            </label>
            <input autoComplete="current-password" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7] focus:border-transparent transition" id="password" name="password" placeholder="Enter your password"  type="password"/>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-2" >
            Confirm Password
            </label>
            <input autoComplete="current-password" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7] focus:border-transparent transition" id="confirmpassword" name="confirmpassword" placeholder="Enter your password"  type="password"/>
          </div>
          
          <button className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 rounded-xl transition" type="submit">
            Sign Up
          </button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-400">
          </p>
        </div>
        </main>
      </div>

    </>
  )
}
