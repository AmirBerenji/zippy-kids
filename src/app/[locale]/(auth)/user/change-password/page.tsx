import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import ChangePasswordForm from "./ChangePasswordForm";


export default function Loginpage() {
  const locale = useLocale();
  const t = useTranslations("SignIn");

  return (
    <>
      <div className="bg-[#f2f9fd] min-h-screen flex flex-col  ">
        <main className="flex-grow flex flex-col md:flex-row items-center justify-center px-4 py-12 max-w-6xl mx-auto w-full min-h-[calc(100vh-96px)] ">
          <div className="hidden md:block md:w-1/2 h-full ">
            <img
              alt="Happy diverse group of kids playing outdoors in colorful clothes, smiling and having fun in a sunny park with green grass and blue sky"
              className="object-cover w-full h-full rounded-l-3xl  shadow-lg opacity-85"
              height="600"
              src="/assets/images/banner.jpg"
              width="600"
            />
          </div>
          <div className="w-full md:w-1/2 bg-white rounded-r-3xl rounded-l-3xl md:rounded-l-none shadow-lg p-10 max-w-md mx-auto ">
           <Link href={`/${locale}/`}>
           <img src="/assets/images/logo.png" className="w-12  m-auto" />
           </Link>
            <h1 className="text-3xl font-bold text-[#2f3e4e] mb-6 text-center">
              Change Password
            </h1>
            

                <ChangePasswordForm />


            
          </div>
        </main>
      </div>
    </>
  );
}
