import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AvisoLegalPage() {
  return (
    <div className="flex flex-col items-center min-h-svh bg-background p-4 sm:p-6 md:p-8">
      <div className="absolute top-4 left-4">
        <Button asChild variant="ghost">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Link>
        </Button>
      </div>
      <main className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in-50 duration-500">
        <header className="text-center pt-8">
          <div className="flex flex-col items-center">
            <Link href="/">
              <Image
                src="https://i.imgur.com/WgK3nj4.png"
                alt="Logo del centro educativo"
                width={150}
                height={41}
                priority
                className="mb-6"
                style={{ height: 'auto' }}
              />
            </Link>
            <h1 className="text-5xl font-headline text-title">Aviso Legal</h1>
          </div>
        </header>
        <Card className="shadow-lg rounded-xl">
          <CardContent className="pt-6 text-lg leading-relaxed text-card-foreground/90 space-y-4">
            <p>
              <strong>Titular del sitio</strong><br/>
              Este sitio web es titularidad de COLEGIO NUESTRA SEÑORA DEL BUEN CONSEJO LA LAGUNA (en adelante, “el Centro”), con CIF R3800058D, inscrito en el Registro de Centros Educativos con el número 38002648.<br/>
              Dirección: Avenida San Diego, 26. 38208 La Laguna (Santa Cruz de Tenerife)<br/>
              Correo electrónico: admin@buenconsejolalaguna.com<br/>
              Teléfono: 922 259 636
            </p>
            <p>
              <strong>Objeto del sitio</strong><br/>
              El sitio ofrece textos breves y reflexiones para su lectura por el profesorado con su alumnado, organizados por etapas educativas. No se recaban datos personales a través del sitio. Algunos textos pueden incluir enlaces a vídeos (p. ej., YouTube) u otros recursos de terceros.
            </p>
            <p>
              <strong>Condiciones de uso</strong><br/>
              El acceso y uso del sitio implica la aceptación de las presentes condiciones. El usuario se compromete a realizar un uso adecuado y lícito de los contenidos y a no emplearlos con fines contrarios a la ley, la moral o el orden público.
            </p>
            <p>
              <strong>Propiedad intelectual e industrial</strong><br/>
              Los contenidos, diseño, logotipos, textos y demás elementos del sitio son propiedad del Centro o de sus legítimos titulares y están protegidos por la normativa aplicable. Queda prohibida su reproducción, distribución o comunicación pública salvo autorización expresa o amparo legal.
            </p>
            <p>
              <strong>Enlaces y contenidos de terceros</strong><br/>
              El sitio puede incluir enlaces a webs y servicios de terceros (por ejemplo, YouTube u otros sitios). El Centro no asume responsabilidad por los contenidos, políticas o prácticas de dichos sitios enlazados. La activación de estos enlaces puede implicar que el tercero aplique sus propias cookies y tratamientos de datos conforme a sus políticas.
            </p>
            <p>
              <strong>Responsabilidad</strong><br/>
              El Centro no garantiza la disponibilidad continua del sitio ni la inexistencia de errores, si bien adoptará medidas razonables para prevenirlos y corregirlos. El uso de la información del sitio se realiza por cuenta y riesgo del usuario.
            </p>
            <p>
              <strong>Protección de datos</strong><br/>
              No se recaban datos personales a través de este sitio. Consulte la Política de privacidad para más información.
            </p>
            <p>
              <strong>Ley aplicable y jurisdicción</strong><br/>
              Estas condiciones se rigen por la legislación española. Salvo normativa imperativa aplicable, las partes se someten a los juzgados y tribunales de Santa Cruz de Tenerife.
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
        <div className="flex justify-center items-center gap-x-2 mt-4">
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
