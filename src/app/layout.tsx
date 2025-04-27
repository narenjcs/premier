import "@/css/satoshi.css";
import "@/css/style.css";


import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";


import AuthGard from './auth-gard';
import MainLayOut from '@/components/Layouts/main-layout';


import { auth } from '@/auth';


export const metadata: Metadata = {
  title: {
    template: "%s | NextAdmin - Next.js Dashboard Kit",
    default: "NextAdmin - Next.js Dashboard Kit",
  },
  description:
    "Next.js admin dashboard toolkit with 200+ templates, UI components, and integrations for fast dashboard development.",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const session = await auth();

  if (!session) {
    
    return (<html lang="en">

      <body className={"font-inter antialiased bg-slate-100 text-slate-600"}>
    
      <NextTopLoader color="#5750F1" showSpinner={true} /><AuthGard>{children}</AuthGard> 
     
       </body>
    </html>);
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
      
        <MainLayOut>

       <AuthGard>{children} </AuthGard> 
        </MainLayOut>
       
      </body>
    </html>
  );
}
