import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PrivacidadPage() {
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
            <h1 className="text-5xl font-headline text-title">Política de Privacidad</h1>
          </div>
        </header>
        <Card className="shadow-lg rounded-xl">
          <CardContent className="pt-6 text-lg leading-relaxed text-card-foreground/90 space-y-4">
            <p>
              <strong>Responsable del tratamiento</strong><br/>
              COLEGIO NUESTRA SEÑORA DEL BUEN CONSEJO LA LAGUNA (CIF R3800058D)<br/>
              Dirección: Avenida San Diego, 26. 38208 La Laguna (Santa Cruz de Tenerife)<br/>
              Correo-e: admin@buenconsejolalaguna.com<br/>
              Tel.: 922 259 636
            </p>
            <p>
              <strong>Descripción del sitio y finalidad</strong><br/>
              El sitio web es meramente informativo y muestra textos y reflexiones por etapas educativas para su uso por el profesorado con el alumnado. No se recaban datos personales a través del sitio ni se utilizan formularios, analítica web, perfiles o publicidad.
            </p>
            <p>
              <strong>Base jurídica</strong><br/>
              No se realiza tratamiento de datos personales a través del sitio. Si el usuario contacta por medios externos (teléfono o correo), la base jurídica será la atención de solicitudes relacionadas con la actividad educativa del Centro y, en su caso, el cumplimiento de obligaciones legales.
            </p>
            <p>
              <strong>Categorías de datos y procedencia</strong><br/>
              El sitio no solicita ni trata datos personales. Únicamente podrían tratarse datos técnicos de conexión necesarios para servir el contenido (p. ej., dirección IP, cabeceras de petición), generalmente gestionados por proveedores de infraestructura.
            </p>
            <div>
              <strong>Proveedores y destinatarios</strong>
              <ul className="list-disc list-outside ml-6 mt-2 space-y-1">
                <li>Alojamiento y entrega de contenidos: Netlify, Inc. (hosting/CDN).</li>
                <li>Servicios de Google/Firebase: el sitio ha sido creado con herramientas de Firebase/Google. En la configuración actual, no se emplean servicios de recogida de datos (p. ej., Firestore, Auth, Analytics) en el frontend del usuario final; no obstante, la infraestructura de Google puede intervenir en la entrega de recursos, pudiendo tratar datos técnicos de conexión.</li>
                <li>Recursos externos:
                  <ul className="list-disc list-outside ml-6 mt-1">
                    <li>Google Fonts (tipografías).</li>
                    <li>Imgur (alojamiento del logotipo).</li>
                    <li>Sitios de terceros enlazados (p. ej., YouTube u otras páginas), cuando el usuario accede a dichos enlaces.</li>
                  </ul>
                </li>
              </ul>
              <p className="mt-2">Estos proveedores pueden recibir datos técnicos de conexión para prestar sus servicios. No se utilizan con fines de analítica propia en este sitio.</p>
            </div>
            <div>
              <strong>Transferencias internacionales</strong>
              <p className="mt-2">El uso de Netlify, Google/Firebase, Google Fonts, Imgur y YouTube puede implicar transferencias internacionales de datos técnicos. Dichos proveedores declaran aplicar garantías adecuadas (p. ej., cláusulas contractuales tipo). Para más información, consulte sus políticas:</p>
              <ul className="list-disc list-outside ml-6 mt-2 space-y-1">
                <li>Netlify: <a href="https://www.netlify.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.netlify.com/privacy/</a></li>
                <li>Google/Firebase y Google Fonts: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://policies.google.com/privacy</a></li>
                <li>Imgur: <a href="https://imgur.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://imgur.com/privacy</a></li>
                <li>YouTube/Google: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://policies.google.com/privacy</a></li>
              </ul>
            </div>
            <p>
              <strong>Plazos de conservación</strong><br/>
              El Centro no conserva datos personales a través del sitio web. Los registros técnicos que puedan mantener los proveedores se regirán por sus respectivas políticas.
            </p>
            <p>
              <strong>Derechos de los interesados</strong><br/>
              Las personas usuarias pueden ejercer derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad mediante comunicación a admin@buenconsejolalaguna.com, acreditando su identidad. Asimismo, pueden reclamar ante la AEPD (www.aepd.es).
            </p>
            <p>
              <strong>Menores de edad</strong><br/>
              El sitio está orientado a que el profesorado utilice los contenidos con su alumnado. No se solicitan ni tratan datos de menores a través del sitio.
            </p>
            <p>
              <strong>Actualizaciones de la política</strong><br/>
              Esta Política podrá actualizarse ante cambios legales o técnicos. Se indicará la fecha de la última actualización.
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
