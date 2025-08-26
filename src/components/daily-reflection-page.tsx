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
import { generateReflectionQuestions } from '@/ai/flows/generate-reflection-questions';
import { Loader } from 'lucide-react';

interface DailyReflectionPageProps {
  initialText: string;
  initialQuestions: string[];
}

export function DailyReflectionPage({ initialText, initialQuestions }: DailyReflectionPageProps) {
  const [currentDate, setCurrentDate] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [text, setText] = useState(initialText);
  const [questions, setQuestions] = useState(initialQuestions);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const today = new Date();
    const formattedDate = `Hoy es ${today.toLocaleDateString('es-ES', { weekday: 'long' })}, ${today.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}`;
    setCurrentDate(formattedDate);
  }, []);

  const handleLevelChange = async (level: string) => {
    setSelectedLevel(level);
    setIsLoading(true);
    try {
      const newText = getDailyTextForLevel(level, new Date());
      setText(newText);
      const reflectionData = await generateReflectionQuestions({ text: newText });
      setQuestions(reflectionData.questions);
    } catch (error) {
      console.error("Error updating content:", error);
      setText("Hubo un error al cargar el texto. Por favor, inténtalo de nuevo.");
      setQuestions([]);
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
            width={206}
            height={56}
            className="mx-auto mb-4"
            priority
          />
          <h1 className="text-4xl sm:text-5xl font-bold font-headline text-primary-foreground bg-primary rounded-lg py-2 px-4 inline-block shadow-md">
            ¡Buenos días!
          </h1>
          <p className="text-muted-foreground pt-4 text-lg">Un momento del día para la reflexión y la oración grupal</p>
          <div className="flex justify-center items-center gap-6 pt-2 text-primary/80">
            <Sprout className="h-6 w-6" aria-label="Crecimiento" />
            <Users className="h-6 w-6" aria-label="Comunidad" />
            <BookOpen className="h-6 w-6" aria-label="Aprendizaje" />
          </div>
          {currentDate && <p className="text-muted-foreground pt-4 text-md">{currentDate}</p>}
        </header>

        <div className="w-full max-w-xs mx-auto">
          <Select onValueChange={handleLevelChange}>
            <SelectTrigger className="bg-card border-border shadow-sm">
              <SelectValue placeholder="Selecciona tu nivel educativo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="infantil-primaria">Infantil y Primaria</SelectItem>
              <SelectItem value="secundaria">Secundaria</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center p-10">
            <Loader className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : selectedLevel ? (
          <>
            <Card className="shadow-lg transition-all hover:shadow-xl rounded-xl">
              <CardContent className="pt-6">
                <blockquote className="text-lg leading-relaxed text-card-foreground/90 border-l-4 border-accent pl-4 italic">
                  {text}
                </blockquote>
              </CardContent>
            </Card>

            <Card className="shadow-lg transition-all hover:shadow-xl rounded-xl">
              <CardHeader className="text-center">
                <CardTitle className="font-headline text-3xl text-primary/90">Pistas para la reflexión</CardTitle>
              </CardHeader>
              <CardContent>
                {questions && questions.length > 0 ? (
                  <ul className="space-y-6">
                    {questions.slice(0, 3).map((question, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                          {index + 1}
                        </div>
                        <p className="text-base leading-relaxed text-muted-foreground mt-1.5 text-left">
                          {question}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No se pudieron generar preguntas en este momento.</p>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="shadow-lg transition-all hover:shadow-xl rounded-xl">
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-center">
                Aún no hay lectura ni oración para tu nivel y la fecha de hoy. Por favor, selecciónalo o vuelve mañana.
              </p>
            </CardContent>
          </Card>
        )}


        <footer className="text-center text-sm text-muted-foreground py-4">
            <p>{new Date().getFullYear()} · Buen Consejo La Laguna</p>
        </footer>

      </main>
    </div>
  );
}
