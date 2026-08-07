import { isAdminUnlocked } from "@/action/adminAuthAction";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Link from "next/link"; // Add global styles if needed
import AdminGate from "./components/adminGate";
import AdminLockButton from "./components/adminLockButton";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Checked on the server, so neither the menu nor any page is sent to the
  // browser until the passcode has been entered.
  const unlocked = await isAdminUnlocked();

  if (!unlocked) {
    return (
      <html lang={locale}>
        <body>
          <NextIntlClientProvider locale={locale}>
            <AdminGate />
          </NextIntlClientProvider>
        </body>
      </html>
    );
  }

  const menuItems = [
    { label: "Dashboard", href: `/${locale}/admin` },
    { label: "Nurses", href: `/${locale}/admin/nurse` },
    { label: "Add Nurse", href: `/${locale}/admin/nurse/addNurse` },
    { label: "Doctors", href: `/${locale}/admin/doctor` },
    { label: "Products", href: `/${locale}/admin/product` },
    { label: "Add Product", href: `/${locale}/admin/product/addProduct` },
    { label: "Settings", href: `/${locale}/admin/settings` },
  ];

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale}>
          <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white hidden md:flex md:flex-col">
              <div className="p-4 font-bold text-lg border-b border-gray-700">
                Admin Panel
              </div>
              <nav className="flex flex-col p-4 space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="hover:bg-gray-700 p-2 rounded"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto p-4 border-t border-gray-700">
                <AdminLockButton className="text-gray-300 hover:text-white" />
              </div>
            </aside>

            {/* Mobile Menu */}
            <div className="md:hidden fixed top-0 left-0 z-50 w-full bg-gray-800 text-white flex justify-between items-center p-4">
              <span className="font-bold">Admin</span>
              <MobileMenu items={menuItems} />
            </div>

            {/* Page Content */}
            <main className="flex-1 p-4 mt-16 md:mt-0 bg-gray-100">
              {children}
            </main>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

// Responsive dropdown for mobile
function MobileMenu({ items }: { items: { label: string; href: string }[] }) {
  return (
    <details className="relative">
      <summary className="cursor-pointer">Menu</summary>
      <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-md z-50">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block px-4 py-2 hover:bg-gray-200"
          >
            {item.label}
          </Link>
        ))}
        <div className="px-4 py-2 border-t border-gray-200">
          <AdminLockButton className="text-gray-600 hover:text-black" />
        </div>
      </div>
    </details>
  );
}
