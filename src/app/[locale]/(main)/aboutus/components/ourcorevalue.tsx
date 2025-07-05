import React from 'react'

export default function AboutOurCoreValue() {
  return (
    <>
         <section className=" mx-auto px-6 sm:px-12 md:px-20 lg:px-32 py-16 bg-[#e6f0f6]">
   <h2 className="  text-3xl font-bold text-[#2f3e4e] mb-12 text-center">
    Our Core Values
   </h2>
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
     <i className="fas fa-heart text-[#ff9a5a] text-5xl mb-4">
     </i>
     <h3 className="text-xl font-semibold mb-2 text-[#2f3e4e]">
      Compassion
     </h3>
     <p className="text-gray-600">
      We foster kindness and empathy in every interaction.
     </p>
    </div>
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
     <i className="fas fa-lightbulb text-[#ff9a5a] text-5xl mb-4">
     </i>
     <h3 className="text-xl font-semibold mb-2 text-[#2f3e4e]">
      Creativity
     </h3>
     <p className="text-gray-600">
      Encouraging imagination and innovative thinking.
     </p>
    </div>
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
     <i className="fas fa-users text-[#ff9a5a] text-5xl mb-4">
     </i>
     <h3 className="text-xl font-semibold mb-2 text-[#2f3e4e]">
      Community
     </h3>
     <p className="text-gray-600">
      Building strong, supportive relationships with families and partners.
     </p>
    </div>
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
     <i className="fas fa-book-open text-[#ff9a5a] text-5xl mb-4">
     </i>
     <h3 className="text-xl font-semibold mb-2 text-[#2f3e4e]">
      Learning
     </h3>
     <p className="text-gray-600">
      Providing engaging and effective educational experiences.
     </p>
    </div>
   </div>
  </section>

    </>
  )
}
