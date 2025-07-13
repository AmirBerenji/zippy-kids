import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import RegisterForm from "./registerForm";

export default function Signuppage() {
  const t = useTranslations("SignUp");
  return (
    <>
      <div className="bg-[#f2f9fd] min-h-screen flex flex-col  ">
        <main className="flex-grow flex flex-col md:flex-row items-center justify-center px-4 py-12 max-w-6xl mx-auto w-full min-h-[calc(100vh-96px)] ">
          <div className="hidden md:block md:w-1/2 h-full">
            <img
              alt="Happy diverse group of kids playing outdoors in colorful clothes, smiling and having fun in a sunny park with green grass and blue sky"
              className="object-cover w-full h-full rounded-l-3xl shadow-lg opacity-85"
              height="600"
              src="/assets/images/banner.jpg"
              width="600"
            />
          </div>
          <div className="w-full md:w-1/2 bg-white rounded-r-3xl rounded-l-3xl md:rounded-l-none shadow-lg p-10 max-w-md mx-auto ">
            <h1 className="text-3xl font-bold text-[#2f3e4e] mb-6 text-center">
              {t("header")}
            </h1>
            <RegisterForm />
            <p className="mt-6 text-center text-sm text-[#4f5c69]">
              {t("alreadyHaveAccount")}
              <Link
                className="text-[#2f3e4e] ml-1 font-semibold"
                href="/user/login"
              >
                {t("signin")}
              </Link>
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
