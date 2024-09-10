import { Skeleton } from 'src/components/ui/Skeleton';

export default function CarGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <Skeleton key={index} className="h-[28.75rem] w-full" />
        ))}
    </div>
  );
}
