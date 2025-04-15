import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
      <Script
          id="adsense-script"
          strategy="afterInteractive"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8015585586602031"
          crossOrigin="anonymous"
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}