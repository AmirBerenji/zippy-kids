import React from 'react'

export default function Servicepage() {
  return (
    <>

  <section className="relative bg-[#e6f0f6] py-16 px-6 sm:px-12 md:px-20 lg:px-32 text-center">
   <h1 className="text-4xl sm:text-3xl font-extrabold text-orange-400 max-w-4xl mx-auto leading-tight">
    Our Services
   </h1>
   <p className="mt-4 text-lg sm:text-xl text-gray-500 max-w-3xl mx-auto">
    Discover the wide range of services we offer to support children and families.
   </p>
   {/* <div className="rounded-[50%_50%_50%_50%/40%_40%_60%_60%]  border-8 border-[#c6d9e3] overflow-hidden">         */}
     <img alt="Children playing happily with a nurse, doctor, and event organizer in a bright colorful environment" className="mx-auto mt-10 rounded-lg shadow-lg w-full max-w-4xl object-cover" height="300" loading="lazy" src="https://storage.googleapis.com/a1aa/image/4f08f25a-6d2b-4226-787f-32533c41b88b.jpg" width="600"/>

  {/* </div> */}
   
  </section>

  <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 py-16">
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
     <img alt="Friendly female nurse with stethoscope smiling and interacting with children in a bright clinic room" className="rounded-lg mb-4 w-full h-48 object-cover" height="300" loading="lazy" src="https://storage.googleapis.com/a1aa/image/13c74af1-c69f-4f8d-efcc-d82fa50fa6bb.jpg" width="400"/>
     <h3 className="text-xl font-semibold text-orange-600 mb-2">
      Nurse Care
     </h3>
     <p className="text-gray-500">
      Professional nursing support ensuring children's health and well-being.
     </p>
    </div>

    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
     <img alt="Smiling male pediatric doctor with white coat and stethoscope in a child-friendly medical office" className="rounded-lg mb-4 w-full h-48 object-cover" height="300" loading="lazy" src="https://storage.googleapis.com/a1aa/image/3382207e-a75c-43db-a5fe-8002d315ef62.jpg" width="400"/>
     <h3 className="text-xl font-semibold text-orange-600 mb-2">
      Pediatric Doctor
     </h3>
     <p className="text-gray-500">
      Expert medical care tailored for children's unique needs.
     </p>
    </div>

    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
     <img alt="Children enjoying a colorful birthday party with balloons and entertainers" className="rounded-lg mb-4 w-full h-48 object-cover" height="300" loading="lazy" src="https://storage.googleapis.com/a1aa/image/4f08f25a-6d2b-4226-787f-32533c41b88b.jpg" width="400"/>
     <h3 className="text-xl font-semibold text-orange-600 mb-2">
      Event Planning
     </h3>
     <p className="text-gray-500">
      Fun and engaging events designed to create joyful memories.
     </p>
    </div>

    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
     <img alt="Child counselor talking kindly with a young child in a cozy room" className="rounded-lg mb-4 w-full h-48 object-cover" height="300" loading="lazy" src="https://storage.googleapis.com/a1aa/image/bab56a14-570d-4f89-b9f7-ece7882d60d9.jpg" width="400"/>
     <h3 className="text-xl font-semibold text-orange-600 mb-2">
      Counseling
     </h3>
     <p className="text-gray-500">
      Emotional and psychological support for children and families.
     </p>
    </div>

    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
     <img alt="Teacher helping children with learning activities in a bright classNameroom" className="rounded-lg mb-4 w-full h-48 object-cover" height="300" loading="lazy" src="https://storage.googleapis.com/a1aa/image/e22feb3d-1b9d-4847-4611-27344ed3d04e.jpg" width="400"/>
     <h3 className="text-xl font-semibold text-orange-600 mb-2">
      Educational Programs
     </h3>
     <p className="text-gray-500">
      Innovative learning experiences to inspire young minds.
     </p>
    </div>
 
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
     <img alt="Healthy colorful fruits and vegetables arranged for children's nutrition" className="rounded-lg mb-4 w-full h-48 object-cover" height="300" loading="lazy" src="https://storage.googleapis.com/a1aa/image/8f809fd6-88ef-4e02-f519-b9c0cf54ba17.jpg" width="400"/>
     <h3 className="text-xl font-semibold text-orange-600 mb-2">
      Nutrition Guidance
     </h3>
     <p className="text-gray-500">
      Promoting healthy eating habits for growing children.
     </p>
    </div>

    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
     <img alt="Physical therapist assisting a child with exercises in a bright therapy room" className="rounded-lg mb-4 w-full h-48 object-cover" height="300" loading="lazy" src="https://storage.googleapis.com/a1aa/image/e151a4df-a91a-4168-29aa-d93bc6fd55a1.jpg" width="400"/>
     <h3 className="text-xl font-semibold text-orange-600 mb-2">
      Physical Therapy
     </h3>
     <p className="text-gray-500">
      Specialized therapy to support children's physical development.
     </p>
    </div>

    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
     <img alt="Speech therapist working with a young child using flashcards" className="rounded-lg mb-4 w-full h-48 object-cover" height="300" loading="lazy" src="https://storage.googleapis.com/a1aa/image/bc772fa5-b68d-4144-dc63-2cc66d2ea413.jpg" width="400"/>
     <h3 className="text-xl font-semibold text-orange-600 mb-2">
      Speech Therapy
     </h3>
     <p className="text-gray-500">
      Helping children improve communication skills.
     </p>
    </div>

    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
     <img alt="Children happily playing and doing homework in after school care program" className="rounded-lg mb-4 w-full h-48 object-cover" height="300" loading="lazy" src="https://storage.googleapis.com/a1aa/image/d13b6d05-4795-46ef-0aef-3e51e93bdabe.jpg" width="400"/>
     <h3 className="text-xl font-semibold text-orange-600 mb-2">
      After School Care
     </h3>
     <p className="text-gray-500">
      Safe and fun environment for children after school hours.
     </p>
    </div>
   </div>
  </section>

  <section className="bg-orange-700 text-white py-16 px-6 sm:px-12 md:px-20 lg:px-32 text-center">
   <h2 className="text-3xl font-extrabold mb-4">
    Interested in Our Services?
   </h2>
   <p className="mb-8 max-w-3xl mx-auto text-lg">
    Contact us today to learn more or to schedule a consultation.
   </p>
   <a className="inline-block bg-white text-orange-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-orange-100 transition" href="/en/contact">
    Contact Us
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
