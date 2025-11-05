import React from "react";
import Service from "./service";

export default function OurService() {
  return (
    <>
      <section className="w-full bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 lg:px-32 py-16 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            <Service
              image="/assets/images/service/nurse-service.jpg"
              title="Nurse Care"
              description="Professional nursing support ensuring children's health and well-being."
              link="/services/nurse-care"
            />
            <Service
              image="/assets/images/service/doctor.jpg"
              title="Pediatric Doctor"
              description="Expert medical care tailored for children's unique needs."
              link="/services/doctor"
            />
            <Service
              image="/assets/images/service/event-plannig.jpg"
              title="Event Planning"
              description="Fun and engaging events designed to create joyful memories."
              link="/services/events"
            />

            {/* 
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <img
              alt="Child counselor talking kindly with a young child in a cozy room"
              className="rounded-lg mb-4 w-full h-48 object-cover"
              height="300"
              loading="lazy"
              src="https://storage.googleapis.com/a1aa/image/bab56a14-570d-4f89-b9f7-ece7882d60d9.jpg"
              width="400"
            />
            <h3 className="text-xl font-semibold text-orange-600 mb-2">
              Counseling
            </h3>
            <p className="text-gray-500">
              Emotional and psychological support for children and families.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <img
              alt="Teacher helping children with learning activities in a bright classNameroom"
              className="rounded-lg mb-4 w-full h-48 object-cover"
              height="300"
              loading="lazy"
              src="https://storage.googleapis.com/a1aa/image/e22feb3d-1b9d-4847-4611-27344ed3d04e.jpg"
              width="400"
            />
            <h3 className="text-xl font-semibold text-orange-600 mb-2">
              Educational Programs
            </h3>
            <p className="text-gray-500">
              Innovative learning experiences to inspire young minds.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <img
              alt="Healthy colorful fruits and vegetables arranged for children's nutrition"
              className="rounded-lg mb-4 w-full h-48 object-cover"
              height="300"
              loading="lazy"
              src="https://storage.googleapis.com/a1aa/image/8f809fd6-88ef-4e02-f519-b9c0cf54ba17.jpg"
              width="400"
            />
            <h3 className="text-xl font-semibold text-orange-600 mb-2">
              Nutrition Guidance
            </h3>
            <p className="text-gray-500">
              Promoting healthy eating habits for growing children.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <img
              alt="Physical therapist assisting a child with exercises in a bright therapy room"
              className="rounded-lg mb-4 w-full h-48 object-cover"
              height="300"
              loading="lazy"
              src="https://storage.googleapis.com/a1aa/image/e151a4df-a91a-4168-29aa-d93bc6fd55a1.jpg"
              width="400"
            />
            <h3 className="text-xl font-semibold text-orange-600 mb-2">
              Physical Therapy
            </h3>
            <p className="text-gray-500">
              Specialized therapy to support children's physical development.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <img
              alt="Speech therapist working with a young child using flashcards"
              className="rounded-lg mb-4 w-full h-48 object-cover"
              height="300"
              loading="lazy"
              src="https://storage.googleapis.com/a1aa/image/bc772fa5-b68d-4144-dc63-2cc66d2ea413.jpg"
              width="400"
            />
            <h3 className="text-xl font-semibold text-orange-600 mb-2">
              Speech Therapy
            </h3>
            <p className="text-gray-500">
              Helping children improve communication skills.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <img
              alt="Children happily playing and doing homework in after school care program"
              className="rounded-lg mb-4 w-full h-48 object-cover"
              height="300"
              loading="lazy"
              src="https://storage.googleapis.com/a1aa/image/d13b6d05-4795-46ef-0aef-3e51e93bdabe.jpg"
              width="400"
            />
            <h3 className="text-xl font-semibold text-orange-600 mb-2">
              After School Care
            </h3>
            <p className="text-gray-500">
              Safe and fun environment for children after school hours.
            </p>
          </div> */}
          </div>
        </div>
      </section>
    </>
  );
}
