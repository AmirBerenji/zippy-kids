import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getProfile } from "@/action/apiAction";
import MainHeader from "./components/MainHeader";
import Sidebar from "./components/Sidebar";
import { UserProvider } from "@/app/context/UserContext";

async function getDataFromBarrer() {
  const req = await getProfile();
  console.log("getDataFromBarrer", req);
  return req;
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const userData = await getDataFromBarrer();
  return (
    <>
    <UserProvider initialImage={
  userData?.photo
    ? `https://zippy.elrincondsabor.com/storage/app/public/${userData.photo}`
    : "https://storage.googleapis.com/a1aa/image/ba44c489-de91-426d-20e1-3e0d56e98f5f.jpg"
}>
      <div className=" w-full min-h-screen bg-gray-50 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.05)] flex overflow-hidden">
        {/* <Sidebar /> */}
        <main className="flex-1 flex flex-col ">
          <MainHeader user={userData} />
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </main>
      </div>
    </UserProvider>
    </>
  );
}
