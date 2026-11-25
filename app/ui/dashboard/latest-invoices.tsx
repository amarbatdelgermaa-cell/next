// ТАЙЛБАР: Сүүлийн нэхэмжлэхүүдийг харуулна.
import {getInvoices} from '@/app/lib/data';
export default async function LatestInvoices(){const rows=(await getInvoices()).slice(0,5);return <section className="rounded-xl bg-white border p-6"><h2 className="font-bold text-xl mb-4">Сүүлийн нэхэмжлэхүүд</h2>{rows.map(x=><div key={x.id} className="flex justify-between border-b py-3 text-sm"><span>{x.customer_name}</span><span>${(x.amount/100).toFixed(2)}</span></div>)}</section>}
