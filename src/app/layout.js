'use client';
import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ReduxProvider from "../../redux/ReduxProvider";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";
import { metaData } from "../utils/metaData";
import { usePathname } from 'next/navigation';

const RootLayout = ({ children }) => {
  const pathname = usePathname();

  const metaMatch = metaData.find((i) => i.key === pathname);

  const ogImageUrl = "/assets/logo4.png"
  const originUrl = process.env.IS_PRODUCTION == 0 ? "" : "";


  return (
    <ReduxProvider>
      <html lang="en">
        <head>
          <title>{metaMatch?.title}</title>
          <meta name="title" content={metaMatch?.title} />
          <meta name="description" content={metaMatch?.description} />

          <meta property="og:title" content={metaMatch?.title} />
          <meta name="twitter:title" content={metaMatch?.title} />

          <meta itemProp="name" content={metaMatch?.title} />
          <meta itemProp="description" content={metaMatch?.description} />
          <meta property="og:description" content={metaMatch?.description} />
          <meta name="twitter:description" content={metaMatch?.description} />

          {/* Meta Keywords (optional but can still help for other engines) */}
          <meta name="keywords" content="high-quality pharmaceuticals, healthcare solutions, buy medications, wellness products, prescription medicines, Critical Kare Pharma, pharmacy, USA, health solutions" />
          <meta name="keywords" content={metaMatch?.keywords} />

          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          {/* Removed redundant description */}
          <link rel="icon" href="/favicon.ico" />

          {/* Preload Images */}
          <link rel="preload" fetchPriority="high" href="/Images/Logo/e-sanad-web.svg" as="image" />
          <link rel="preload" fetchPriority="high" href="/Images/HomeScreen/homeScreen/Group_186.svg" as="image" />
          <link rel="icon" href="/assets/logo4.png" />
          <link rel="canonical" href={`${originUrl}${metaMatch?.key}`} />

          {/* Google / Search Engine Tags */}
          <meta itemProp="image" content={ogImageUrl} />

          {/* Facebook Meta Tags */}
          <meta property="og:url" content={`${originUrl}${metaMatch?.key}`} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={ogImageUrl} />

          {/* Twitter Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content={ogImageUrl} />
          <meta name="twitter:url" content={`${originUrl}${metaMatch?.key}`} />
          <meta name="twitter:site" content={`${originUrl}${metaMatch?.key}`} />

          {/* Only for Development */}
          {process.env.IS_PRODUCTION == 0 && (
            <>
              <meta name="robots" content="noindex" />
            </>
          )}

          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        </head>
        <head>
          <title>{metaMatch?.title}</title>
          <meta name="title" content={metaMatch?.title} />
          <meta name="description" content={metaMatch?.description} />

          <meta property="og:title" content={metaMatch?.title} />
          <meta name="twitter:title" content={metaMatch?.title} />

          <meta itemProp="name" content={metaMatch?.title} />
          <meta itemProp="description" content={metaMatch?.description} />
          <meta property="og:description" content={metaMatch?.description} />
          <meta name="twitter:description" content={metaMatch?.description} />

          {/* Meta Keywords (optional but can still help for other engines) */}
          <meta name="keywords" content="high-quality pharmaceuticals, healthcare solutions, buy medications, wellness products, prescription medicines, Critical Kare Pharma, pharmacy, USA, health solutions" />
          <meta name="keywords" content={metaMatch?.keywords} />

          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          {/* Removed redundant description */}
          <link rel="icon" href="/favicon.ico" />

          {/* Preload Images */}
          <link rel="preload" fetchPriority="high" href="/assets/logo4.png" as="image" />
          <link rel="preload" fetchPriority="high" href="/assets/logo4.png" as="image" />
          <link rel="icon" href="/assets/logo4.png" />
          <link rel="canonical" href={`${originUrl}${metaMatch?.key}`} />

          {/* Google / Search Engine Tags */}
          <meta itemProp="image" content={ogImageUrl} />

          {/* Facebook Meta Tags */}
          <meta property="og:url" content={`${originUrl}${metaMatch?.key}`} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={ogImageUrl} />

          {/* Twitter Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content={ogImageUrl} />
          <meta name="twitter:url" content={`${originUrl}${metaMatch?.key}`} />
          <meta name="twitter:site" content={`${originUrl}${metaMatch?.key}`} />

          {/* Only for Development */}
          {process.env.IS_PRODUCTION == 0 && (
            <>
              <meta name="robots" content="noindex" />
            </>
          )}

          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        </head>

        <body>

          <Navbar />
          <main>{children}</main>
          <Footer />

          {/* <BottomBanner /> */}
          <ToastContainer />
        </body>
      </html>
    </ReduxProvider>
  );
};

export default RootLayout;
