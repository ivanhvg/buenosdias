import { DailyReflectionPage } from '@/components/daily-reflection-page';

export default async function Home() {
  // Los textos y reflexiones se cargan en el cliente,
  // por lo que pasamos valores iniciales vacíos.
  return <DailyReflectionPage initialText="" initialQuestions={[]} />;
}
