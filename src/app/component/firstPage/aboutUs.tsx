import React from 'react'

export default function AboutUs() {
  return (
      <section className="max-w-7xl mx-auto px-4 sm:px-10 mt-20 flex flex-col lg:flex-row items-center gap-10">
        <div className="relative lg:w-1/2 max-w-md">
          <img alt="Smiling child with orange rocket backpack pointing up, isolated on white background with light blue abstract shape behind" className="relative z-10 rounded-full" height="400" src="https://storage.googleapis.com/a1aa/image/481d26af-995f-44e9-112f-63520e8420c3.jpg" width="400" />
          <img alt="Light blue abstract shape behind child image" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full opacity-50 pointer-events-none select-none" height="300" src="https://storage.googleapis.com/a1aa/image/a1dbfa68-19c0-4ec1-c531-3224652062b8.jpg" style={{ zIndex: '0' }} width="300" />
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-orange-400 rounded-lg rotate-12 shadow-lg pointer-events-none select-none" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 80%)' }} >
          </div>
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-orange-400 rounded-lg rotate-12 shadow-lg pointer-events-none select-none" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)' }}  >
          </div>
        </div>
        <div className="lg:w-1/2 max-w-lg">
          <h2 className="text-3xl font-semibold text-[#2f3e4e] mb-6">
            About us
          </h2>
          <p className='font-semibold text-gray-700 mb-1' >
            What Makes KidooHub Special?
          </p>
          <p className="text-xs text-gray-500 mb-8">
           We’re not just a directory. We carefully select and partner with professionals and places that meet our high standards for safety, reliability, and child-friendliness. Whether you're a new parent or managing a busy schedule with school-age kids, we help you make confident choices with less time.
           </p>

           <p className='font-semibold text-gray-700 mb-1' >
            Our Services Include:
          </p>
          <div className="flex flex-col space-y-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="text-[#ff9a5a] text-2xl mt-1">
                <i className="fas fa-hands-helping">
                </i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-1">
                  Nanny & Nurse Support
                </h3>
                <p className="text-xs text-gray-500">
                 Home care and supervision from qualified caregivers, including after-school and short-term help.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-[#ff9a5a] text-2xl mt-1">
                <i className="fas fa-stethoscope">
                </i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-1">
                  Doctor Appointments
                </h3>
                <p className="text-xs text-gray-500">
                  Find and book pediatricians and child health specialists easily.
                  </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-[#ff9a5a] text-2xl mt-1">
                <i className="fas fa-theater-masks">
                </i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-1">
                  Entertainment & Events
                </h3>
                <p className="text-xs text-gray-500">
                  Explore kid-friendly cafés, activity centers, weekend events, and places to celebrate birthdays.
                  </p>
              </div>
            </div>
             <div className="flex items-start space-x-4">
              <div className="text-[#ff9a5a] text-2xl mt-1">
                <i className="fas fa-chalkboard-teacher">
                </i>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-1">
                  After-School Programs
                </h3>
                <p className="text-xs text-gray-500">
                  Discover safe, educational, and fun after-school care tailored to your child’s age and needs
                  </p>
              </div>
            </div>
          </div>
          {/* <button className="bg-[#ff9a5a] text-white text-xs font-semibold rounded-full px-6 py-2 hover:bg-[#e07a3f] transition flex items-center space-x-2">
            <span>
              Schedule a tour
            </span>
            <i className="fas fa-arrow-right text-xs">
            </i>
          </button> */}
        </div>
      </section>

  )
}
