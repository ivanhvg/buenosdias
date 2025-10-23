import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AvisoLegalPage() {
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
            <h1 className="text-5xl font-headline text-title">Aviso Legal</h1>
          </div>
        </header>
        <Card className="shadow-lg rounded-xl">
          <CardContent className="pt-6 text-lg leading-relaxed text-card-foreground/90 space-y-4">
            <p>
              El presente Aviso Legal regula el acceso y uso del sitio web buenos-dias-bcll.web.app (en adelante, el "Sitio Web"), titularidad del Colegio Buen Consejo La Laguna.
            </p>
            <p>
              El uso del Sitio Web atribuye la condición de usuario e implica la aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en este Aviso Legal.
            </p>
            <p>
              <strong>Contenido del Sitio Web:</strong> El contenido de este Sitio Web, incluyendo los textos de reflexión y las preguntas, tiene un carácter meramente informativo y pastoral, destinado a la comunidad educativa del Colegio Buen Consejo La Laguna.
            </p>
            <p>
              <strong>Propiedad Intelectual:</strong> Los contenidos de este Sitio Web, salvo que se indique lo contrario, son propiedad del Colegio o de sus legítimos titulares y están protegidos por la normativa de propiedad intelectual.
            </p>
          </CardContent>
        </Card>
      </main>
      <footer className="text-center text-sm text-muted-foreground py-4 mt-8">
        <p>Colegio Buen Consejo La Laguna © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
