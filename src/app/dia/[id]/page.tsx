import { trip } from "@/data/itinerary";
import { DayDetail } from "@/components/DayDetail";

export function generateStaticParams() {
  return trip.days.map((d) => ({ id: d.id }));
}

export const dynamicParams = false;

export default async function DiaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <DayDetail id={id} />;
}
