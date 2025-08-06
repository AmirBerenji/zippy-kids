import React from 'react'
import ContactHeader from './components/header'
import GetInTouch from './components/getInTouch'
import SendMessage from './components/sendMessage'

export default function Contactpage() {
  return (
    <>
 
<ContactHeader/>
 
  <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 py-16 grid grid-cols-1 md:grid-cols-2 gap-16">
    <GetInTouch/>
   
    <SendMessage/>
  </section>

  {/* <section className="bg-orange-700 text-white py-16 px-6 sm:px-12 md:px-20 lg:px-32 text-center">
   <h2 className="text-3xl font-extrabold mb-4">
    Ready to Join the Zippy Kids Family?
   </h2>
   <p className="mb-8 max-w-3xl mx-auto text-lg">
    Contact us today and discover how we can support your child's growth and creativity.
   </p>
   <a className="inline-block bg-white text-orange-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-orange-100 transition" href="/en/aboutus">
    Learn More About Us
   </a>
  </section> */}

  
    </>
  )
}
