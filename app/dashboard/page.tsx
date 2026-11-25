// ТАЙЛБАР: Нүүр статистик болон сүүлийн 5 нэхэмжлэхийг харуулна.

import { getSummary, getInvoices } from '../lib/data';
import { Users, Receipt, Wallet, Clock3 } from 'lucide-react';
import InvoiceStatus from '@/app/ui/invoices/status';

export default async function Dashboard() {
  // Хоёр мэдээллийг зэрэг авч, бүгдийг бэлэн болтол хүлээнэ.
  const [stats, rows] = await Promise.all([
    getSummary(),
    getInvoices(),
  ]);

  // Дөрвөн статистик картын нэр, тоо, дүрсийг нэг дор бэлдэнэ.
  const cards = [
    {
      name: 'Хэрэглэгч',
      value: stats.customers,
      Icon: Users,
    },
    {
      name: 'Нэхэмжлэх',
      value: stats.invoices,
      Icon: Receipt,
    },
    {
      name: 'Төлөгдсөн',
      value: (stats.paid / 100).toFixed(2) + ' $',
      Icon: Wallet,
    },
    {
      name: 'Хүлээгдэж буй',
      value: (stats.pending / 100).toFixed(2) + ' $',
      Icon: Clock3,
    },
  ];

  return (
    <div className="space-y-7">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ name, value, Icon }) => (
          <section
            key={name}
            className="rounded-xl border bg-white p-6"
          >
            <div className="flex items-center gap-2 text-slate-600">
              <Icon size={20} />
              {name}
            </div>

            <p className="mt-5 text-3xl font-semibold">
              {value}
            </p>
          </section>
        ))}
      </div>

      <section className="rounded-xl border bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          Сүүлийн нэхэмжлэхүүд
        </h2>

        {/* Сүүлийн таван нэхэмжлэхийг харуулна */}
        {rows.slice(0, 5).map((invoice) => (
          <div
            key={invoice.id}
            className="flex flex-wrap items-center justify-between gap-4 border-b py-3 text-sm"
          >
            <span className="flex-1">
              {invoice.customer_name}
            </span>

            <span>
              ${(invoice.amount / 100).toFixed(2)}
            </span>

            <InvoiceStatus status={invoice.status} />
          </div>
        ))}
      </section>
    </div>
  );
}
