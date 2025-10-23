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
              El Colegio Buen Consejo La Laguna se compromete a proteger la privacidad de los usuarios que accedan a este Sitio Web.
            </p>
            <p>
              <strong>Recogida de datos:</strong> Este Sitio Web no recoge datos de carácter personal de los usuarios sin su conocimiento, ni se ceden a terceros. La única interacción se produce mediante la selección de la etapa educativa para visualizar los contenidos, una acción que es anónima.
            </p>
            <p>
              <strong>Uso de la información:</strong> La información sobre la etapa seleccionada se utiliza únicamente para mostrar el contenido correspondiente y no se almacena ni se asocia a ningún usuario.
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
