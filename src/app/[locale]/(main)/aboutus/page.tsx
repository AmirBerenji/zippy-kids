import Link from 'next/link';
import React from 'react'
import Aboutheader from './components/header';
import AboutOurmission from './components/ourmission';
import AboutOurvision from './components/ourvision';

export default function AboutUspage() {

  return (
    <>
 
 <Aboutheader/>

  <AboutOurmission/>
  
<AboutOurvision/>
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

  <section className=" py-16 px-6 sm:px-12 md:px-20 lg:px-32">
   <h2 className="text-3xl font-bold text-[#2f3e4e] mb-12 text-center">
    Meet Our Team
   </h2>
   <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
     <img alt="Jane Doe smiling female teacher with short brown hair wearing a blue blouse" 
     className="rounded-full mb-4 w-36 h-36 object-cover" height="150" loading="lazy" 
     src="/assets/images/aboutus/team4.jpg" width="150"/>
     <h3 className="text-xl font-semibold text-[#2f3e4e]">
      Jane Doe
     </h3>
     <p className="text-orange-600 font-medium mb-2">
      Founder &amp; CEO
     </p>
     <p className="text-gray-600 text-sm">
      Passionate about early childhood education and community building.
     </p>
    </div>
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
     <img alt="John Smith male teacher with glasses and beard wearing a green shirt" className="rounded-full mb-4 w-36 h-36 object-cover" height="150" loading="lazy" 
     src="/assets/images/aboutus/team1.jpg" width="150"/>
     <h3 className="text-xl font-semibold text-[#2f3e4e]">
      John Smith
     </h3>
     <p className="text-orange-600 font-medium mb-2">
      Head of Curriculum
     </p>
     <p className="text-gray-600 text-sm">
      Expert in child development and innovative teaching methods.
     </p>
    </div>
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
     <img alt="Emily Johnson female teacher with long blonde hair wearing a yellow cardigan" className="rounded-full mb-4 w-36 h-36 object-cover" height="150" loading="lazy" 
     src="/assets/images/aboutus/team2.jpg" width="150"/>
     <h3 className="text-xl font-semibold text-[#2f3e4e]">
      Emily Johnson
     </h3>
     <p className="text-orange-600 font-medium mb-2">
      Community Manager
     </p>
     <p className="text-gray-600 text-sm">
      Dedicated to fostering strong relationships with families and partners.
     </p>
    </div>
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
     <img alt="Michael Lee male teacher with short black hair wearing a red polo shirt" className="rounded-full mb-4 w-36 h-36 object-cover" height="150" loading="lazy" 
     src="/assets/images/aboutus/team3.jpg" width="150"/>
     <h3 className="text-xl font-semibold text-[#2f3e4e]">
      Michael Lee
     </h3>
     <p className="text-orange-600 font-medium mb-2 ">
      Creative Director
     </p>
     <p className="text-gray-600 text-sm">
      Inspiring creativity and fun through arts and activities.
     </p>
    </div>
   </div>
  </section>

  <section className="bg-[#e6f0f6] text-white py-16 px-6 sm:px-12 md:px-20 lg:px-32 text-center">
   <h2 className="text-3xl font-extrabold mb-4 text-[#2f3e4e]">
    Join the Zippy Kids Family
   </h2>
   <p className="mb-8 max-w-3xl mx-auto text-lg text-gray-600">
    Whether you're a parent, educator, or community member, we welcome you to be part of our journey to empower children everywhere.
   </p>

   <Link href={"/contact"} className="inline-block bg-orange-400 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-orange-600 transition" >
      Contact Us
   </Link>
   
  </section>

 

    </>
  )
}
