export function CardsSkeleton(){return <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">{Array.from({length:4},(_,i)=><div key={i} className="h-32 bg-slate-200 animate-pulse rounded-xl"/>)}</div>}
export function RevenueChartSkeleton(){return <div className="h-72 bg-slate-200 animate-pulse rounded-xl"/>}
export function LatestInvoicesSkeleton(){return <div className="h-72 bg-slate-200 animate-pulse rounded-xl"/>}
export default function DashboardSkeleton(){return <div className="space-y-6"><CardsSkeleton/><RevenueChartSkeleton/><LatestInvoicesSkeleton/></div>}
