import type { Metadata } from "next";
import { Poppins, Bangers, Montserrat } from "next/font/google";
import "./globals.css";
import "./css/layout.css";
import "./css/user.css";
import "./css/home-animation.css"

import { Toaster } from "@/components/ui/toaster"

import FullPageLoader from "@/components/general/full-page-loader";
import NavbarComponent from "@/components/general/navbar-component";

import { cn } from "@/lib/utils"
import CustomContext from "@/context/CustomContext";

const poppins = Montserrat({ 
  subsets: ["latin"], 
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});
export const metadata: Metadata = {
  title: "Fable",
  description: "A decentralized platform that helps businesses create story-telling challenges for their customers & communities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (

    <html lang="en" className=" h-svh">
      <head>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
        <link rel="icon" href="/images/fable_black.png" sizes="any" />
      </head>
      <body className={cn(
        "bg-[#151515] h-screen",
        poppins.className
        )}>
          {/* 2f3d47 */}
          {/* 553c9a */}
        <CustomContext>

          <NavbarComponent />

              <div className="main_content bg-[#151515]">
                {children}
              </div>

        </CustomContext>

        <Toaster />
        <FullPageLoader />
        
      </body>
    </html>
  );
}
