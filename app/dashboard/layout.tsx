// ТАЙЛБАР: Dashboard-ийн бүх дэд хуудсанд ижил хажуу цэсийг харуулна.
import Sidebar from '../ui/sidebar';
export default function DashboardLayout({children}:{children:React.ReactNode}){return <div className="min-h-screen flex flex-col md:flex-row"><Sidebar/><main className="flex-1 min-w-0 p-6 md:p-10">{children}</main></div>}
