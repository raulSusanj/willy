import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navigation";
import Footer from "./components/Footer";
import Provider from "./components/SessionProvider";
import { getServerSession } from "next-auth";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Willy App",
  description: "Because freedom is important",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Provider session={session}>
          <Navbar />
          <div className="bg-white">{children}</div>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
