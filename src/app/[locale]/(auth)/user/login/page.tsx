import React from 'react'

export default function Loginpage() {
  return (
    <>

 <head>

  <meta content="width=device-width, initial-scale=1" name="viewport"/>
  <title>
   Zippy Kids - Login
  </title>
  <script src="https://cdn.tailwindcss.com">
  </script>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&amp;display=swap" rel="stylesheet"/>
 
 </head>
 <body className="bg-gradient-to-b from-[#F9F9F9] to-[#E0F2FE] min-h-screen flex flex-col">
  <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
   <a className="flex items-center space-x-2" href="/">
    <img alt="Zippy Kids logo, colorful playful letters Z and K intertwined" className="w-10 h-10" height="40" src="https://storage.googleapis.com/a1aa/image/3ad11bd0-dfbd-4916-0163-234bfd2dca4d.jpg" width="40"/>
    <span className="text-2xl font-semibold text-[#0C4A6E]">
     Zippy Kids
    </span>
   </a>
   <nav className="hidden md:flex space-x-6 text-[#0C4A6E] font-semibold">
    <a className="hover:text-[#0284C7] transition" href="/en">
     Home
    </a>
    <a className="hover:text-[#0284C7] transition" href="/en/about">
     About
    </a>
    <a className="hover:text-[#0284C7] transition" href="/en/contact">
     Contact
    </a>
   </nav>
  </header>
  <main className="flex-grow flex flex-col md:flex-row items-center justify-center px-4 py-12 max-w-6xl mx-auto w-full min-h-[calc(100vh-96px)]">
   <div className="hidden md:block md:w-1/2 h-full">
    <img alt="Happy diverse group of kids playing outdoors in colorful clothes, smiling and having fun in a sunny park with green grass and blue sky" className="object-cover w-full h-full rounded-l-3xl shadow-lg" height="600" src="https://storage.googleapis.com/a1aa/image/849c3305-9066-4b98-3a4e-4942ea4bcfea.jpg" width="600"/>
   </div>
   <div className="w-full md:w-1/2 bg-white rounded-r-3xl rounded-l-3xl md:rounded-l-none shadow-lg p-10 max-w-md mx-auto">
    <h1 className="text-3xl font-bold text-[#0C4A6E] mb-6 text-center">
     Welcome Back
    </h1>
    <form action="#" className="space-y-6" method="POST" >
     <div>
      <label className="block text-sm font-semibold text-[#0C4A6E] mb-2" >
       Email address
      </label>
      <input autoComplete='email' className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7] focus:border-transparent transition" id="email" name="email" placeholder="you@example.com"  type="email"/>
     </div>
     <div>
      <label className="block text-sm font-semibold text-[#0C4A6E] mb-2" >
       Password
      </label>
      <input autoComplete="current-password" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0284C7] focus:border-transparent transition" id="password" name="password" placeholder="Enter your password"  type="password"/>
     </div>
     <div className="flex items-center justify-between">
      <label className="inline-flex items-center text-sm text-[#0C4A6E]">
       <input className="form-checkbox h-5 w-5 text-[#0284C7]" name="remember" type="checkbox"/>
       <span className="ml-2">
        Remember me
       </span>
      </label>
      <a className="text-sm text-[#0284C7] hover:underline" href="/en/forgot-password">
       Forgot password?
      </a>
     </div>
     <button className="w-full bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold py-3 rounded-xl transition" type="submit">
      Log In
     </button>
    </form>
    <p className="mt-6 text-center text-sm text-[#0C4A6E]">
     Don't have an account?
     <a className="text-[#0284C7] font-semibold hover:underline" href="/en/signup">
      Sign up
     </a>
    </p>
   </div>
  </main>
  <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-[#0C4A6E]">
   © 2024 Zippy Kids. All rights reserved.
  </footer>
 </body>

    </>
  )
}
