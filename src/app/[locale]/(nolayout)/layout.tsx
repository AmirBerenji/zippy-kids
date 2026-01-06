import '@fortawesome/fontawesome-free/css/all.min.css';


export default function RootLayout({
    children,
}: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    )
}