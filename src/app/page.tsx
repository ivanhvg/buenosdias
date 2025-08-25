import { generateReflectionQuestions } from '@/ai/flows/generate-reflection-questions';
import { DailyReflectionPage } from '@/components/daily-reflection-page';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import { getInitialDailyText } from '@/lib/texts';

export default async function Home() {
  let initialText = '';
  let questions: string[] = [];
  let error: string | null = null;

  try {
    initialText = getInitialDailyText();
    if (initialText) {
      const reflectionData = await generateReflectionQuestions({ text: initialText });
      questions = reflectionData.questions;
    } else {
        error = 'Could not retrieve the daily text.';
    }
  } catch (e) {
    console.error(e);
    error = 'Failed to generate reflection questions. Please try again later.';
  }

  if (error) {
    return (
      <div className="flex h-screen w-full items-center justify-center p-4 bg-background">
        <Alert variant="destructive" className="max-w-lg">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <DailyReflectionPage initialText={initialText} initialQuestions={questions} />;
}
