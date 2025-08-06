import { useTranslations } from 'next-intl';
import React from 'react'

export default function SendMessage() {
    const t = useTranslations("Contact.SendUsMessage");
  return (
    <>
    <form action="#" className="bg-white rounded-lg shadow-lg p-8 " method="POST" >
    <h2 className="text-3xl font-bold text-[#ff9a5a] mb-6">
     {t("sendUsMessage")}
    </h2>
    <div className="mb-4">
     <label className="block text-[#2f3e4e] font-semibold mb-2" >
     {t("fullName")}
     </label>
     <input className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff9a5a] focus:border-transparent" id="name" name="name" placeholder={t("fullNamePlaceholder")} required type="text"/>
    </div>
    <div className="mb-4">
     <label className="block text-[#2f3e4e] font-semibold mb-2" >
      {t("emailAddress")}
     </label>
     <input className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff9a5a] focus:border-transparent" id="email" name="email" placeholder="you@example.com" required type="email"/>
    </div>
    <div className="mb-4">
     <label className="block text-[#2f3e4e] font-semibold mb-2" >
      {t("subject")}
     </label>
     <input className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff9a5a] focus:border-transparent" id="subject" name="subject" placeholder={t("subjectPlaceholder")} required type="text"/>
    </div>
    <div className="mb-6">
     <label className="block text-[#2f3e4e] font-semibold mb-2" >
     {t("message")}
     </label>
     <textarea className="w-full border border-gray-300 rounded-md px-4 py-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[#ff9a5a] focus:border-transparent" id="message" name="message" placeholder={t("messagePlaceholder")} required></textarea>
    </div>
    <button className="w-full bg-[#ff9a5a] hover:bg-orange-500 text-white font-semibold py-3 rounded-md shadow-md transition" type="submit">
    {t("sendMessageBtn")}
    </button>
   </form>
    </>
  )
}
