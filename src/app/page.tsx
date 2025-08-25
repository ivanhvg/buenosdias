import { generateReflectionQuestions } from '@/ai/flows/generate-reflection-questions';
import { DailyReflectionPage } from '@/components/daily-reflection-page';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"

async function getDailyText(): Promise<string> {
  // NOTE: In a real-world application, this function would fetch text from a source like a Google Doc.
  // For this demonstration, we are using a static, public domain text.
  const text = "It is not the critic who counts; not the man who points out how the strong man stumbles, or where the doer of deeds could have done them better. The credit belongs to the man who is actually in the arena, whose face is marred by dust and sweat and blood; who strives valiantly; who errs, who comes short again and again, because there is no effort without error and shortcoming; but who does actually strive to do the deeds; who knows great enthusiasms, the great devotions; who spends himself in a worthy cause; who at the best knows in the end the triumph of high achievement, and who at the worst, if he fails, at least fails while daring greatly, so that his place shall never be with those cold and timid souls who neither know victory nor defeat.";
  return text;
}

export default async function Home() {
  let dailyText = '';
  let questions: string[] = [];
  let error: string | null = null;

  try {
    dailyText = await getDailyText();
    if (dailyText) {
      const reflectionData = await generateReflectionQuestions({ text: dailyText });
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

  return <DailyReflectionPage text={dailyText} questions={questions} />;
}
