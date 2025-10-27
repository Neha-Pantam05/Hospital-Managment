/**
 * These are the skeleton components that Suspense will use as fallbacks
 * while the async components are fetching data.
 */

// Skeleton for StatsSection
export const StatsSkeleton = () => (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        <div className="h-8 w-64 bg-gray-200 rounded-md animate-pulse"></div>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="h-28 bg-gray-100 rounded-lg animate-pulse"></div>
        <div className="h-28 bg-gray-100 rounded-lg animate-pulse"></div>
        <div className="h-28 bg-gray-100 rounded-lg animate-pulse"></div>
        <div className="h-28 bg-gray-100 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
  
  // Skeleton for GraphsSection
  export const GraphSkeleton = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="h-80 bg-gray-100 rounded-lg animate-pulse lg:col-span-2"></div>
      <div className="h-80 bg-gray-100 rounded-lg animate-pulse"></div>
      <div className="h-80 bg-gray-100 rounded-lg animate-pulse lg:col-span-3"></div>
    </div>
  );
  
  // Skeleton for TodaysAppointmentSection
  export const AppointmentTableSkeleton = () => (
    <div className="shadow-lg rounded-lg">
      <div className="p-6 border-b">
        <div className="h-8 w-56 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
      <div className="p-6">
        <div className="h-10 w-full bg-gray-100 rounded-md animate-pulse mb-4"></div>
        <div className="h-10 w-full bg-gray-100 rounded-md animate-pulse mb-2 opacity-80"></div>
        <div className="h-10 w-full bg-gray-100 rounded-md animate-pulse mb-2 opacity-60"></div>
      </div>
    </div>
  );
  