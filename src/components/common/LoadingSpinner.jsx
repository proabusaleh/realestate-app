export default function LoadingSpinner({
  size = "md",
  className = "",
  color = "blue",
}) {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
    xl: "w-16 h-16 border-4",
  };

  const colors = {
    blue: "border-blue-600 border-t-transparent",
    gray: "border-gray-600 border-t-transparent",
    white: "border-white border-t-transparent",
    red: "border-red-600 border-t-transparent",
    green: "border-green-600 border-t-transparent",
  };

  return (
    <div className={`inline-block animate-spin rounded-full ${sizes[size]} ${colors[color]} ${className}`} />
  );
}

export function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
}

export function CardLoader() {
  return (
    <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />
  );
}

export function ListLoader({ count = 3 }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-80 bg-gray-100 rounded-2xl animate-pulse" />
      ))}
    </div>
  );
}

export function Skeleton({ className = "", style }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      style={style}
    />
  );
}