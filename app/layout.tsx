import type { Metadata } from "next"
import "./globals.css"


export const metadata: Metadata = {
  title: "Chennai Metro Rail Limited | Smart Urban Mobility",
  description: "Experience the cinematic journey of Chennai Metro through an immersive digital experience. Fast, clean, and futuristic transit.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans bg-black antialiased">
        {children}
      </body>
    </html>
  )
}
