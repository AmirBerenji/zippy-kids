import ContactTopSide from "@/app/component/nav/ContactTopSide";
import NavbarTopSide from "@/app/component/nav/NavbarTopSide";


export default function RootLayout({
    children,
}: { children: React.ReactNode }) {
    return (
        <>
            <ContactTopSide />
            <NavbarTopSide />
            {children}
        </>
    )
}