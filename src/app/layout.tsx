import type {Metadata} from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';

export const metadata: Metadata = {
  title: 'Buenos días · BCLL',
  description: 'Nuestro espacio diario para la reflexión y la oración grupal.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta property="og:title" content="Buenos días · BCLL" />
        <meta property="og:description" content="Nuestro espacio diario para la reflexión y la oración grupal." />
        <meta property="og:image" content="https://www.buenconsejolalaguna.com/wp-content/uploads/2022/03/logoBCLL.png" />
        <meta property="og:url" content="https://buenos-dias-bcll.web.app" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Literata:opsz,wght@24..96,400;24..96,700&family=Open+Sans:wght@400&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
