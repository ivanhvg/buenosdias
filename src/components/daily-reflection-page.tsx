'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
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
        <header className="text-center space-y-4">
          <Image
            src="https://picsum.photos/150/150"
            alt="Logo del centro educativo"
            width={150}
            height={150}
            className="mx-auto rounded-full"
            data-ai-hint="school logo"
          />
          <h1 className="text-4xl sm:text-5xl font-bold font-headline text-primary-foreground bg-primary rounded-lg py-2 px-4 inline-block shadow-md">
            ¡Buenos días!
          </h1>
          <p className="text-muted-foreground pt-2 text-lg">Un momento del día para la reflexión y la oración grupal</p>
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
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Pistas para la reflexión</CardTitle>
              </CardHeader>
              <CardContent>
                {questions && questions.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {questions.map((question, index) => (
                      <AccordionItem value={`item-${index + 1}`} key={index}>
                        <AccordionTrigger className="text-left text-base hover:no-underline data-[state=open]:text-primary data-[state=open]:font-semibold">
                          Pregunta {index + 1}
                        </AccordionTrigger>
                        <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                          {question}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
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
