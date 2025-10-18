
export default async function RootLayout({children}) {
    return (
        <div className="flex flex-col min-h-screen">
            {children}
        </div>
    )
}