import "./globals.css";

export const metadata = {
  title: "Privacy Falcon",
  description: "Privacy & Compliance Intelligence Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0B0F14] text-[#E5E7EB] antialiased">
        {children}
      </body>
    </html>
  );
}
