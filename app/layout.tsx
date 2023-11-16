import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import { ReactQueryProvider } from "app/ReactQueryProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "styles/globals.css";

export const metadata: Metadata = {
  title: "HiWEB Task",
  description: "Generated by create next app",
  icons: {
    icon: "/hiweb-logo.png",
  },
};

const vazirFont = Vazirmatn({ subsets: ["latin"] });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryProvider>
      <html dir="rtl" lang="fa">
        <body className={vazirFont.className}>
          {children}
          <ToastContainer rtl />
        </body>
      </html>
    </ReactQueryProvider>
  );
};

export default RootLayout;
