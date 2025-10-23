import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PoliticaCookiesPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh bg-background p-4 sm:p-6 md:p-8">
      <main className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in-50 duration-500">
        <div className="absolute top-4 left-4">
          <Button asChild variant="ghost">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Link>
          </Button>
        </div>
        <header className="text-center pt-16">
          <div className="flex flex-col items-center">
            <Image
              src="https://i.imgur.com/WgK3nj4.png"
              alt="Logo del centro educativo"
              width={150}
              height={41}
              style={{ height: 'auto' }}
              priority
              className="mb-6"
            />
            <h1 className="text-5xl font-headline text-title">Política de Cookies</h1>
          </div>
        </header>
        <Card className="shadow-lg rounded-xl">
          <CardContent className="pt-6 text-lg leading-relaxed text-card-foreground/90 space-y-4">
            <p>
              <strong>Qué son las cookies</strong><br/>
              Las cookies son pequeños archivos que se almacenan en el dispositivo del usuario. También existen tecnologías similares (p. ej., local storage, píxeles).
            </p>
            <div>
              <strong>Uso de cookies en este sitio</strong>
              <ul className="list-disc list-outside ml-6 mt-2 space-y-2">
                <li>El sitio no utiliza cookies propias ni cookies de analítica o publicidad.</li>
                <li>
                  Para servir el sitio y sus recursos se emplean terceros que pueden tratar datos técnicos y, en algunos casos, establecer cookies técnicas:
                  <ul className="list-disc list-outside ml-6 mt-1">
                    <li>Netlify (hosting/CDN) para la entrega segura de contenidos.</li>
                    <li>Google Fonts para servir tipografías (no suele establecer cookies, pero puede recoger datos técnicos de la solicitud).</li>
                    <li>Imgur para servir el logotipo (puede establecer cookies técnicas y, según su configuración, otras).</li>
                    <li>Sitios de terceros enlazados (p. ej., YouTube): cuando el usuario hace clic y accede al enlace o, si se incrustaran vídeos en el futuro, el proveedor puede establecer cookies propias.</li>
                  </ul>
                </li>
              </ul>
            </div>
            <div>
              <strong>Tabla orientativa de terceros y posibles cookies/tecnologías</strong>
              <ul className="list-disc list-outside ml-6 mt-2 space-y-2">
                <li>Netlify (netlify.com): registros técnicos del servicio y, en su caso, cookies estrictamente necesarias. Finalidad: servir y proteger el sitio.</li>
                <li>Google Fonts (fonts.googleapis.com / fonts.gstatic.com): normalmente sin cookies; posible recogida de datos técnicos de conexión. Finalidad: servir tipografías.</li>
                <li>Imgur (imgur.com / i.imgur.com): puede establecer cookies técnicas y de seguridad. Finalidad: servir la imagen del logotipo y proteger el servicio.</li>
                <li>YouTube/Google (youtube.com / youtu.be): si se enlaza o incrusta contenido, YouTube puede establecer cookies, incluidas de preferencia/analítica/marketing según el modo de integración. Recomendación: usar “youtube-nocookie.com” en caso de incrustación.</li>
              </ul>
            </div>
            <div>
              <strong>Gestión y configuración</strong>
              <ul className="list-disc list-outside ml-6 mt-2 space-y-2">
                  <li>Puede configurar su navegador para bloquear o eliminar cookies.</li>
                  <li>Dado que este sitio no instala cookies no esenciales propias ni integra, por defecto, servicios de analítica o publicidad, no se solicita consentimiento para esas finalidades.</li>
                  <li>Si en el futuro se incrustan vídeos de YouTube directamente en la página, se implementará el modo de privacidad avanzada (https://www.youtube-nocookie.com) y, si aun así se establecieran cookies no esenciales, se mostrará un banner de consentimiento con opciones Aceptar/Rechazar/Configurar, bloqueando la carga hasta la aceptación.</li>
              </ul>
            </div>
            <div>
              <strong>Políticas de terceros</strong>
              <ul className="list-disc list-outside ml-6 mt-2 space-y-1">
                <li>Netlify: <a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.netlify.com/privacy/</a></li>
                <li>Google (Firebase y Fonts): <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://policies.google.com/privacy</a></li>
                <li>Imgur: <a href="https://imgur.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://imgur.com/privacy</a></li>
                <li>YouTube/Google: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://policies.google.com/privacy</a></li>
              </ul>
            </div>
            <p>
              <strong>Actualizaciones</strong><br/>
              Esta política se actualizará si se añaden servicios que instalen cookies no esenciales.
            </p>
             <p>
              <strong>Fecha de última actualización</strong><br/>
              [23 octubre 2025]
            </p>
          </CardContent>
        </Card>
      </main>
      <footer className="text-center text-sm text-muted-foreground py-4 mt-8">
        <p className="text-base text-muted-foreground/90">Colegio Buen Consejo La Laguna © {new Date().getFullYear()}</p>
        <div className="flex justify-center items-center gap-x-4 mt-4">
          <Link href="/aviso-legal" className="hover:text-primary transition-colors">
            Aviso legal
          </Link>
          <span className="text-muted-foreground/50">·</span>
          <Link href="/privacidad" className="hover:text-primary transition-colors">
            Privacidad
          </Link>
          <span className="text-muted-foreground/50">·</span>
          <Link href="/politica-de-cookies" className="hover:text-primary transition-colors">
            Política de cookies
          </Link>
        </div>
      </footer>
    </div>
  );
}
