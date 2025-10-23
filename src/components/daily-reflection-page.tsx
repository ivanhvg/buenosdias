'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Sprout, Users, Youtube } from 'lucide-react';
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
import { Button } from './ui/button';

interface DailyReflectionPageProps {
  initialText: string;
  initialQuestions: string[];
}

const valoresDelMes: { [key: string]: { valor: string; mes: string } } = {
  septiembre: { valor: 'ACOGIDA · BIENVENIDA', mes: 'septiembre' },
  octubre: { valor: 'FRATERNIDAD', mes: 'octubre' },
  noviembre: { valor: 'RESPETO', mes: 'noviembre' },
  diciembre: { valor: 'AMOR', mes: 'diciembre' },
  enero: { valor: 'VIDA', mes: 'enero' },
  febrero: { valor: 'PAZ', mes: 'febrero' },
  marzo: { valor: 'RESPONSABILIDAD', mes: 'marzo' },
  abril: { valor: 'TOLERANCIA', mes: 'abril' },
  mayo: { valor: 'ENTUSIASMO', mes: 'mayo' },
  junio: { valor: 'GRATITUD', mes: 'junio' },
};

const DEFAULT_TEXT = "Hoy no hay lectura para la etapa seleccionada. Por favor, vuelve mañana.";

const parseText = (text: string) => {
  const lines = text.split('\n').filter(line => line.trim() !== '');

  return lines.map((line, lineIndex) => {
    // Procesa para encontrar negritas y URLs en la misma línea
    const combinedRegex = /(\*\*.*?\*\*|https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{11})[^\s]*)/g;
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;

    // Procesa títulos en la primera línea
    if (lineIndex === 0) {
      const match = line.match(/^(\*\*.*?\*\*)/);
      if (match) {
        const title = match[1].substring(2, match[1].length - 2);
        parts.push(<strong key={`title-${lineIndex}`} className="font-bold">{title}</strong>);
        line = line.substring(match[1].length);
      }
    }
    
    line.replace(combinedRegex, (match, _group1, videoId, offset) => {
      // Añade el texto antes del match
      if (offset > lastIndex) {
        parts.push(line.substring(lastIndex, offset));
      }

      // Procesa si es negrita (y no es un título ya procesado)
      if (match.startsWith('**') && match.endsWith('**')) {
        const boldText = match.substring(2, match.length - 2);
        // Evita duplicar el título si la regex lo captura de nuevo
        if (lineIndex > 0 || !parts.some(p => typeof p !== 'string' && p.key === `title-${lineIndex}`)) {
          parts.push(<strong key={`bold-${lineIndex}-${lastIndex}`} className="font-bold">{boldText}</strong>);
        }
      }
      // Procesa si es URL de YouTube
      else if (videoId) {
        const fullUrl = `https://www.youtube.com/watch?v=${videoId}`;
        parts.push(
          <a href={fullUrl} target="_blank" rel="noopener noreferrer" key={`youtube-${lineIndex}-${lastIndex}`}>
            <Button variant="link" className="p-0 h-auto text-xl text-primary hover:text-accent">
              <Youtube className="mr-2 h-5 w-5" />
              Ver vídeo en YouTube
            </Button>
          </a>
        );
      } else {
         parts.push(match);
      }
      
      lastIndex = offset + match.length;
      return match;
    });

    // Añade el texto restante de la línea
    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex));
    }

    return (
      <p key={`line-${lineIndex}`} className="mb-4">
        {parts.map((part, partIndex) => (
          <React.Fragment key={partIndex}>{part}</React.Fragment>
        ))}
      </p>
    );
  });
};


export function DailyReflectionPage({ initialText, initialQuestions }: DailyReflectionPageProps) {
  const [currentDate, setCurrentDate] = useState('');
  const [valorDelMes, setValorDelMes] = useState<{ valor: string; mes: string } | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [text, setText] = useState(initialText);
  const [questions, setQuestions] = useState(initialQuestions);
  const [isLoading, setIsLoading] = useState(false);
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
    setSelectedLevel(level);
    setIsLoading(true);
    
    // Añadimos un pequeño retardo para asegurar que el loader se vea.
    setTimeout(async () => {
      try {
        const today = new Date();
        const contentLevel = level;

        const newText = await getDailyTextForLevel(contentLevel, today);
        setText(newText);
        
        if (newText !== DEFAULT_TEXT) {
          const newQuestions = await getDailyReflectionsForLevel(contentLevel, today);
          setQuestions(newQuestions);
        } else {
          setQuestions([]);
        }

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
    }, 500); 
  };

  const showContent = selectedLevel && !isLoading;
  const showInitialMessage = !selectedLevel && !isLoading;
  const showReflectionQuestions = showContent && questions.length > 0 && text !== DEFAULT_TEXT;

  return (
    <div className="flex flex-col items-center justify-center min-h-svh bg-background p-4 sm:p-6 md:p-8">
      <main className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in-50 duration-500">
        <header className="text-center pb-3">
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
            <h1 className="text-6xl font-headline text-title">
              ¡Buenos días!
            </h1>
          </div>
          <p className="text-xl font-medium text-title/80 pt-4">Un momento de la mañana para la reflexión y la oración grupal</p>
          <div className="flex justify-center items-center gap-6 pt-6 text-muted-foreground">
            <Sprout className="h-8 w-8" aria-label="Crecimiento" />
            <Users className="h-8 w-8" aria-label="Comunidad" />
            <BookOpen className="h-8 w-8" aria-label="Aprendizaje" />
          </div>
          {currentDate && <p className="text-muted-foreground pt-4 text-lg italic">{currentDate}</p>}
          {valorDelMes && (
            <div className="pt-6">
              <p className="text-sm text-muted-foreground tracking-widest">Valor del mes</p>
              <div className="mt-2 inline-block bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-md">
                  <p className="text-xl tracking-wider font-display">
                      {valorDelMes.valor.toUpperCase()}
                  </p>
              </div>
            </div>
          )}
        </header>

        <div className="w-full max-w-xs mx-auto">
          <Select onValueChange={handleLevelChange} disabled={isLoading}>
            <SelectTrigger className="bg-card border-border shadow-sm text-lg">
              <SelectValue placeholder="Selecciona tu etapa educativa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="infantil-primaria" className="text-lg">Educación Infantil y Primaria</SelectItem>
              <SelectItem value="secundaria" className="text-lg">Educación Secundaria</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center p-10">
            <Loader className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {showInitialMessage && (
           <Card className="shadow-lg transition-all hover:shadow-xl rounded-xl">
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-center">
                Selecciona una etapa para descubrir la lectura de hoy.
              </p>
            </CardContent>
          </Card>
        )}
        
        {showContent && (
          <div className="space-y-8">
            <Card className="shadow-lg transition-all hover:shadow-xl rounded-xl animate-in fade-in duration-500">
              <CardContent className="pt-6">
                <div className="text-xl leading-relaxed text-card-foreground/90 border-l-4 border-accent pl-4 italic">
                  {parseText(text)}
                </div>
              </CardContent>
            </Card>

            {showReflectionQuestions && (
              <Card className="shadow-lg transition-all hover:shadow-xl rounded-xl animate-in fade-in duration-500">
                <CardHeader className="text-center">
                  <CardTitle className="font-headline text-4xl text-title">Pistas para la reflexión</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-6">
                      {questions.map((question, index) => (
                        <li key={index} className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                            {index + 1}
                          </div>
                          <p className="text-xl leading-relaxed text-muted-foreground text-left">
                            {question}
                          </p>
                        </li>
                      ))}
                    </ul>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        <footer className="text-center text-sm text-muted-foreground py-4">
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

      </main>
    </div>
  );
}

    