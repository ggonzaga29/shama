import { Skeleton } from 'src/components/ui/Skeleton';

export default function CarGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <Skeleton key={index} className="h-[21.75rem] w-full" />
        ))}
    </div>
  );
}
