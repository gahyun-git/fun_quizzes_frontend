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
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
            strategy="afterInteractive"
            async
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}