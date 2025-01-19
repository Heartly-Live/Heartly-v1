import type { Metadata } from "next";
import localFont from "next/font/local";
import { Montserrat_Alternates, Nunito } from "next/font/google";
import "./globals.css";
import WagmiConfigProvider from "@/lib/provider";
// import { Provider } from "react-redux";
// import { store, wrapper } from "@/core/store";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const montserrat = Montserrat_Alternates({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const nunito = Nunito({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Heartly",
  description: "A App to help you connect with people ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${nunito.variable} antialiased`}
      >
        <WagmiConfigProvider>
          {/* <Provider store={store}>{children}</Provider> */}
          {children}
        </WagmiConfigProvider>
      </body>
    </html>
  );
}

// export default wrapper.withRedux(RootLayout);
