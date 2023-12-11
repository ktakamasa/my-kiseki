import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import getCurrentUser from "./utils/getCurrentUser";
// import { getServerSession } from "next-auth";
// import SessionProvider from "@/components/SessionProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500"],
});

export const metadata: Metadata = {
  title: "My-Kiseki",
  description: "Blog to share miracles",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession();
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Header currentUser={currentUser} />
        {/* <SessionProvider session={session}> */}
        {/* creates session before login - so don't use */}
        <main>{children}</main>
        {/* </SessionProvider> */}
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
