import Skeleton from "~/ui/components/feedback/skeleton";

export default function LoadingPage() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-10 w-full max-w-xs" />
        <div className="flex space-x-2">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {Array.from({length: 3}).map((_, index) => (
          <Skeleton key={index} className="h-24 w-full rounded-md" />
        ))}
      </div>
    </div>
  );
}
