import { useTranslations } from 'next-intl';
import React from 'react'

export default function BannerMainPage() {
    const t = useTranslations("BannerMainPage");
  return (
    <>
    <section className="max-w-7xl mx-auto px-4 sm:px-10 mt-10 flex flex-col lg:flex-row items-center lg:items-start gap-10">
        <div className="lg:w-1/2 max-w-lg">
         
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#2f3e4e] leading-tight mb-4">
            {t('joinus')}
            <span className="text-[#ff9a5a]">
              Zippy
            </span>
            {t('family')}
          </h1>
          <p className="text-xs text-gray-500 mb-6">
            {t('bannerdesc')}
          </p>
          <div className="flex items-center space-x-6">
            <button className="bg-[#ff9a5a] text-white text-xs font-semibold rounded-full px-6 py-2 hover:bg-[#e07a3f] transition flex items-center space-x-2">
              <span>
                {t('bannerbtn')}
              </span>
              <i className="fas fa-arrow-right text-xs">
              </i>
            </button>
            <div className="flex items-center space-x-2 text-gray-400 text-xs font-semibold">
              <div className="w-6 h-6 rounded-full bg-[#e6f0f6] flex items-center justify-center">
                <i className="fas fa-phone-alt text-[#7ea6b9] text-[10px]">
                </i>
              </div>
              <span>
                +1 800 700 000
              </span>
            </div>
          </div>
          <div className="flex space-x-2 mt-6 text-gray-300 text-xs font-semibold">
            <span className="cursor-pointer hover:text-[#ff9a5a]">
              ●
            </span>
            <span className="cursor-pointer hover:text-[#ff9a5a]">
              ●
            </span>
            <span className="cursor-pointer hover:text-[#ff9a5a]">
              ●
            </span>
          </div>
        </div>
        <div className="lg:w-1/2 relative max-w-lg">
          <div className="rounded-[50%_50%_50%_50%/40%_40%_60%_60%] border-8 border-[#c6d9e3] overflow-hidden">
            <img alt="Child wearing aviator hat playing with wooden toy plane on carpet in a bright room with bookshelf and globe" className="w-full h-auto object-cover" height="400" src="https://storage.googleapis.com/a1aa/image/cc301b4b-e038-4573-5720-460f1c714ab7.jpg" width="600" />
          </div>
          </div>
      </section>

    
    </>
  )
}
