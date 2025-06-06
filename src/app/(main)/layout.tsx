import ContactTopSide from "../component/nav/ContactTopSide";
import NavbarTopSide from "../component/nav/NavbarTopSide";

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