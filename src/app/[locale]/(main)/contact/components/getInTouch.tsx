import { useTranslations } from 'next-intl';
import React from 'react'

export default function GetInTouch() {
     const t = useTranslations("Contact.GetInTouch");
  return (
    <>
    <div className="space-y-8">
    <h2 className="text-3xl font-bold text-[#ff9a5a]">
        {t("getInTouch")}
    </h2>
    <p className="text-gray-700 text-lg leading-relaxed">
     
     {t("description")}
  
    </p>
    <div className="space-y-6">
     {/* <div className="flex items-start space-x-4">
      <i className="fas fa-map-marker-alt text-[#ff9a5a] text-2xl mt-1">
      </i>
      <div>
       <h3 className="font-semibold text-[#ff9a5a] text-lg">
        Our Address
       </h3>
       <p className="text-gray-600">
        123 Zippy Lane, Fun City, FC 45678
       </p>
      </div>
     </div> */}
     <div className="flex items-start space-x-4">
      <i className="fas fa-phone-alt text-[#ff9a5a] text-2xl mt-1">
      </i>
      <div>
       <h3 className="font-semibold text-[#ff9a5a] text-lg">
        {t("phone")}
        
       </h3>
       <p className="text-gray-600">
        +374 96 882655
       </p>
      </div>
     </div>
     <div className="flex items-start space-x-4">
      <i className="fas fa-envelope text-[#ff9a5a] text-2xl mt-1">
      </i>
      <div>
       <h3 className="font-semibold text-[#ff9a5a] text-lg">
        {t("email")}
       </h3>
       <p className="text-gray-600">
        kidoohubarmenia@gmail.com
       </p>
      </div>
     </div>
     <div className="flex items-start space-x-4">
      <i className="fas fa-clock text-[#ff9a5a] text-2xl mt-1">
      </i>
      <div>
       <h3 className="font-semibold text-[#ff9a5a] text-lg">
        {t("officeHours")}
       </h3>
       <p className="text-gray-600">
        {t("officeHourseValue")}
       </p>
      </div>
     </div>
    </div>
   </div>

    </>
  )
}
