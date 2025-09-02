import { DailyReflectionPage } from '@/components/daily-reflection-page';
import { getInitialDailyText } from '@/lib/texts';

export default async function Home() {
  const initialText = getInitialDailyText();
  // Los textos y reflexiones se cargan en el cliente,
  // por lo que pasamos valores iniciales vacíos o de carga.
  return <DailyReflectionPage initialText={initialText} initialQuestions={[]} />;
}
