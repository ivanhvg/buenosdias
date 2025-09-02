'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Sprout, Users } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardHeader, CardTitle } from './ui/card';
import { getDailyTextForLevel } from '@/lib/texts';
import { getDailyReflectionsForLevel } from '@/lib/reflections';
import { Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DailyReflectionPageProps {
  initialText: string;
  initialQuestions: string[];
}

const valoresDelMes: { [key: string]: { valor: string; mes: string } } = {
  septiembre: { valor: 'ACOGIDA', mes: 'septiembre' },
  octubre: { valor: 'GRATITUD', mes: 'octubre' },
  // Agrega aquí más meses y valores
};

export function DailyReflectionPage({ initialText, initialQuestions }: DailyReflectionPageProps) {
  const [currentDate, setCurrentDate] = useState('');
  const [valorDelMes, setValorDelMes] = useState<{ valor: string; mes: string } | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [text, setText] = useState(initialText);
  const [questions, setQuestions] = useState(initialQuestions);
  const [isLoading, setIsLoading] = useState(false);
  const [showInitialMessage, setShowInitialMessage] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const today = new Date();
    const formattedDate = `Hoy es ${today.toLocaleDateString('es-ES', { weekday: 'long' })}, ${today.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}`;
    setCurrentDate(formattedDate);
    
    const monthName = today.toLocaleString('es-ES', { month: 'long' }).toLowerCase();
    const valor = valoresDelMes[monthName];
    if (valor) {
      setValorDelMes(valor);
    }

  }, []);

  const handleLevelChange = async (level: string) => {
    setShowInitialMessage(false);
    setSelectedLevel(level);
    setIsLoading(true);
    setText('');
    setQuestions([]);
    
    try {
      const today = new Date();
      const newText = await getDailyTextForLevel(level, today);
      setText(newText);
      
      const newQuestions = await getDailyReflectionsForLevel(level, today);
      setQuestions(newQuestions);

    } catch (error) {
      console.error("Error updating content:", error);
      setText("Hubo un error al cargar el contenido. Por favor, inténtalo de nuevo.");
      setQuestions([]);
      toast({
        variant: "destructive",
        title: "Error de carga",
        description: "No se pudo obtener el texto o las reflexiones del día.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <main className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in-50 duration-500">
        <header className="text-center">
          <Image
            src="https://www.buenconsejolalaguna.com/wp-content/uploads/2022/03/logoBCLL.png"
            alt="Logo del centro educativo"
            width={150}
            height={41}
            className="mx-auto"
            priority
          />
          <h1 className="text-4xl sm:text-5xl font-bold font-headline text-primary">
            ¡Buenos días!
          </h1>
          <p className="text-muted-foreground pt-4 text-lg font-medium">Un momento de la mañana para la reflexión y la oración grupal</p>
          <div className="flex justify-center items-center gap-6 pt-6 text-primary/80">
            <Sprout className="h-8 w-8" aria-label="Crecimiento" />
            <Users className="h-8 w-8" aria-label="Comunidad" />
            <BookOpen className="h-8 w-8" aria-label="Aprendizaje" />
          </div>
          {currentDate && <p className="text-muted-foreground/80 pt-10 text-lg italic">{currentDate}</p>}
          {valorDelMes && (
            <div className="mt-4 inline-block bg-accent text-accent-foreground px-4 py-2 rounded-lg shadow-md">
                <p className="text-xl font-bold uppercase tracking-wider">
                    valor del mes de {valorDelMes.mes}: {valorDelMes.valor}
                </p>
            </div>
          )}
        </header>

        <div className="w-full max-w-xs mx-auto">
          <Select onValueChange={handleLevelChange}>
            <SelectTrigger className="bg-card border-border shadow-sm">
              <SelectValue placeholder="Selecciona tu etapa educativa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="primaria">Educación Primaria</SelectItem>
              <SelectItem value="secundaria">Educación Secundaria</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center p-10">
            <Loader className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : showInitialMessage && !selectedLevel ? (
           <Card className="shadow-lg transition-all hover:shadow-xl rounded-xl">
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-center">
                Selecciona una etapa para descubrir la lectura de hoy.
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="shadow-lg transition-all hover:shadow-xl rounded-xl">
              <CardContent className="pt-6">
                <blockquote className="text-lg leading-relaxed text-card-foreground/90 border-l-4 border-accent pl-4 italic space-y-4">
                  {text.split('\n').map((paragraph, index) => (
                    <p key={index}>
                      {paragraph || '\u00A0' /* Render non-breaking space for empty lines */}
                    </p>
                  ))}
                </blockquote>
              </CardContent>
            </Card>

            {questions.length > 0 && (
              <Card className="shadow-lg transition-all hover:shadow-xl rounded-xl">
                <CardHeader className="text-center">
                  <CardTitle className="font-headline text-3xl text-primary/90">Pistas para la reflexión</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-6">
                      {questions.map((question, index) => (
                        <li key={index} className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                            {index + 1}
                          </div>
                          <p className="text-base leading-relaxed text-muted-foreground text-left">
                            {question}
                          </p>
                        </li>
                      ))}
                    </ul>
                </CardContent>
              </Card>
            )}
          </>
        )}

        <footer className="text-center text-sm text-muted-foreground py-4">
            <p>Colegio Buen Consejo La Laguna © {new Date().getFullYear()}</p>
        </footer>

      </main>
    </div>
  );
}
