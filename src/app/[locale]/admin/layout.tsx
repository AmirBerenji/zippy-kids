import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Link from "next/link"; // Add global styles if needed

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

  const menuItems = [
    { label: "Dashboard", href: `/${locale}/admin` },
    { label: "Nurse", href: `/${locale}/admin/nurse` },
    { label: "Add Nurse", href: `/${locale}/admin/nurse/addNurse` },
    { label: "Settings", href: `/${locale}/admin/settings` },
  ];

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale}>
          <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white hidden md:block">
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
      </div>
    </details>
  );
}
