import "./globals.css";
import { Providers } from "../store/providers";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import SubHeaderTop from "../components/layout/SubHeaderTop";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen overflow-hidden bg-[#0B0E11] text-white font-sans selection:bg-blue-500/30">
        <Providers>
          <Header />
          <SubHeaderTop />
          <main className="flex-1 flex flex-col min-h-0 relative px-6 py-6">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
