import React from 'react'

export default function Contactpage() {
  return (
    <>
 

  <section className="relative bg-[#e6f0f6] py-16 px-6 sm:px-12 md:px-20 lg:px-32 text-center">
   <h1 className="text-4xl sm:text-5xl font-extrabold text-orange-700 max-w-4xl mx-auto leading-tight">
    Contact Zippy Kids
   </h1>
   <p className="mt-4 text-lg sm:text-xl text-orange-600 max-w-3xl mx-auto">
    We’d love to hear from you! Reach out with any questions, feedback, or to join our community.
   </p>
   <img alt="Group of Armenian and Russian children playing together happily outdoors, diverse faces and skin tones, smiling and enjoying a sunny day in a park with green grass and trees" className="mx-auto mt-10 rounded-lg shadow-lg w-full max-w-4xl object-cover" height="300" loading="lazy" src="https://storage.googleapis.com/a1aa/image/2e6d5b06-f370-419e-9c36-a63d5c49ba52.jpg" width="600"/>
  </section>

  <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 py-16 grid grid-cols-1 md:grid-cols-2 gap-16">

   <div className="space-y-8">
    <h2 className="text-3xl font-bold text-orange-700">
     Get in Touch
    </h2>
    <p className="text-gray-700 text-lg leading-relaxed">
     Whether you want to learn more about our programs, have questions, or want to collaborate, we’re here to help.
    </p>
    <div className="space-y-6">
     <div className="flex items-start space-x-4">
      <i className="fas fa-map-marker-alt text-orange-500 text-2xl mt-1">
      </i>
      <div>
       <h3 className="font-semibold text-orange-600 text-lg">
        Our Address
       </h3>
       <p className="text-gray-600">
        123 Zippy Lane, Fun City, FC 45678
       </p>
      </div>
     </div>
     <div className="flex items-start space-x-4">
      <i className="fas fa-phone-alt text-orange-500 text-2xl mt-1">
      </i>
      <div>
       <h3 className="font-semibold text-orange-600 text-lg">
        Phone
       </h3>
       <p className="text-gray-600">
        +1 (555) 123-4567
       </p>
      </div>
     </div>
     <div className="flex items-start space-x-4">
      <i className="fas fa-envelope text-orange-500 text-2xl mt-1">
      </i>
      <div>
       <h3 className="font-semibold text-orange-600 text-lg">
        Email
       </h3>
       <p className="text-gray-600">
        contact@zippykids.com
       </p>
      </div>
     </div>
     <div className="flex items-start space-x-4">
      <i className="fas fa-clock text-orange-500 text-2xl mt-1">
      </i>
      <div>
       <h3 className="font-semibold text-orange-600 text-lg">
        Office Hours
       </h3>
       <p className="text-gray-600">
        Monday - Friday: 9:00 AM - 6:00 PM
       </p>
      </div>
     </div>
    </div>
   </div>

   <form action="#" className="bg-white rounded-lg shadow-md p-8" method="POST" >
    <h2 className="text-3xl font-bold text-orange-700 mb-6">
     Send Us a Message
    </h2>
    <div className="mb-4">
     <label className="block text-gray-700 font-semibold mb-2" >
      Full Name
     </label>
     <input className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" id="name" name="name" placeholder="Your full name" required type="text"/>
    </div>
    <div className="mb-4">
     <label className="block text-gray-700 font-semibold mb-2" >
      Email Address
     </label>
     <input className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" id="email" name="email" placeholder="you@example.com" required type="email"/>
    </div>
    <div className="mb-4">
     <label className="block text-gray-700 font-semibold mb-2" >
      Subject
     </label>
     <input className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" id="subject" name="subject" placeholder="Subject of your message" required type="text"/>
    </div>
    <div className="mb-6">
     <label className="block text-gray-700 font-semibold mb-2" >
      Message
     </label>
     <textarea className="w-full border border-gray-300 rounded-md px-4 py-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" id="message" name="message" placeholder="Write your message here..." required></textarea>
    </div>
    <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-md shadow-md transition" type="submit">
     Send Message
    </button>
   </form>
  </section>

  <section className="bg-orange-700 text-white py-16 px-6 sm:px-12 md:px-20 lg:px-32 text-center">
   <h2 className="text-3xl font-extrabold mb-4">
    Ready to Join the Zippy Kids Family?
   </h2>
   <p className="mb-8 max-w-3xl mx-auto text-lg">
    Contact us today and discover how we can support your child's growth and creativity.
   </p>
   <a className="inline-block bg-white text-orange-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-orange-100 transition" href="/en/aboutus">
    Learn More About Us
   </a>
  </section>

  <footer className="bg-gray-100 py-8 px-6 sm:px-12 md:px-20 lg:px-32 text-gray-600 text-sm">
   <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
    <p>
     © 2024 Zippy Kids. All rights reserved.
    </p>
    <div className="flex space-x-6">
     <a aria-label="Facebook" className="hover:text-orange-500 transition" href="#">
      <i className="fab fa-facebook-f">
      </i>
     </a>
     <a aria-label="Twitter" className="hover:text-orange-500 transition" href="#">
      <i className="fab fa-twitter">
      </i>
     </a>
     <a aria-label="Instagram" className="hover:text-orange-500 transition" href="#">
      <i className="fab fa-instagram">
      </i>
     </a>
     <a aria-label="LinkedIn" className="hover:text-orange-500 transition" href="#">
      <i className="fab fa-linkedin-in">
      </i>
     </a>
    </div>
   </div>
  </footer>
    </>
  )
}
