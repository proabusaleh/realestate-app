export default function PropertyCardSkeleton({ variant = "grid" }) {
  if (variant === "list") {
    return (
      <div className="card-hover flex flex-col md:flex-row overflow-hidden animate-pulse">
        <div className="md:w-72 md:min-w-[288px] flex-shrink-0 bg-gray-200 dark:bg-gray-700" />
        <div className="p-6 flex flex-col justify-between flex-1 min-w-0 space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
          <div className="flex items-center gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
            <div className="flex-1">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-hover overflow-hidden animate-pulse">
      <div className="relative h-56 md:h-64 bg-gray-200 dark:bg-gray-700" />
      <div className="p-5 space-y-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
        <div className="flex items-center gap-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
}