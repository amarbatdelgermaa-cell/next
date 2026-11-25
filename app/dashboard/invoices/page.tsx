// ТАЙЛБАР: Нэхэмжлэхүүдийг авч, хайж, 5-аар хуудаслаад хүснэгтээр харуулна.

import Link from 'next/link';

import { getInvoices, isDemo } from '@/app/lib/data';
import { deleteInvoice } from '@/app/lib/actions';
import InvoiceStatus from '@/app/ui/invoices/status';

export default async function Invoices({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  // Хаяг дахь ?query=... болон ?page=... утгуудыг уншина.
  const params = await searchParams;

  // Хайлтын утга
  const query = (params.query || '').toLowerCase();

  // Одоогийн хуудасны дугаар
  const page = Math.max(1, Number(params.page) || 1);

  // Өгөгдлийн сангаас нэхэмжлэхүүдийг авах
  const invoices = await getInvoices();

  // Нэхэмжлэх хайх
  const data = invoices.filter((invoice) =>
    `${invoice.customer_name} ${invoice.customer_email} ${invoice.status} ${invoice.amount}`
      .toLowerCase()
      .includes(query)
  );

  // Хуудаслалт
  // Нэг хуудсанд хамгийн ихдээ таван мөр үзүүлнэ.
  const pageSize = 5;
  const pages = Math.max(1, Math.ceil(data.length / pageSize));
  const currentPage = Math.min(page, pages);

  // Олон мөрөөс зөвхөн одоогийн хуудсанд хамаарахыг сонгоно.
  const rows = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const demo = isDemo();

  return (
    <section className="space-y-6">
      {/* Гарчиг болон шинэ нэхэмжлэх товч */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">
          Нэхэмжлэх
        </h1>

        {!demo && (
          <Link
            href="/dashboard/invoices/create"
            className="rounded-lg bg-blue-700 px-4 py-3 text-white hover:bg-blue-800"
          >
            + Шинэ нэхэмжлэх
          </Link>
        )}
      </div>

      {/* Хайлт */}
      <form className="flex flex-wrap gap-2">
        <label htmlFor="query" className="sr-only">
          Нэхэмжлэх хайх
        </label>

        <input
          id="query"
          name="query"
          type="search"
          defaultValue={params.query || ''}
          placeholder="Хэрэглэгч, төлөвөөр хайх..."
          className="w-full max-w-lg rounded-lg border bg-white p-3"
        />

        <button
          type="submit"
          className="rounded-lg bg-slate-200 px-4 py-3 hover:bg-slate-300"
        >
          Хайх
        </button>
      </form>

      {/* Demo горим */}
      {demo && (
        <p className="text-sm text-amber-700">
          Жишээ өгөгдлийн горим: PostgreSQL холбосны дараа
          нэмэх, засах, устгах боломжтой.
        </p>
      )}

      {/* Нэхэмжлэхийн хүснэгт */}
      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4">Хэрэглэгч</th>
              <th className="p-4">Имэйл</th>
              <th className="p-4">Дүн</th>
              <th className="p-4">Төлөв</th>
              <th className="p-4">Огноо</th>
              <th className="p-4">Үйлдэл</th>
            </tr>
          </thead>

          <tbody>
            {/* map: нэхэмжлэх бүрээр давтаж хүснэгтийн мөр үүсгэнэ */}
            {rows.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-t hover:bg-slate-50"
              >
                {/* Хэрэглэгч */}
                <td className="p-4 font-medium">
                  {invoice.customer_name}
                </td>

                {/* Имэйл */}
                <td className="p-4">
                  {invoice.customer_email}
                </td>

                {/* Дүн */}
                <td className="p-4 font-semibold">
                  ${(invoice.amount / 100).toFixed(2)}
                </td>

                {/* Төлөв: ногоон эсвэл шар */}
                <td className="p-4">
                  <InvoiceStatus status={invoice.status} />
                </td>

                {/* Огноо */}
                <td className="p-4">
                  {invoice.date}
                </td>

                {/* Засах болон устгах */}
                <td className="p-4">
                  {!demo && (
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/dashboard/invoices/${invoice.id}/edit`}
                        className="font-medium text-blue-700 hover:underline"
                      >
                        Засах
                      </Link>

                      <form action={deleteInvoice}>
                        <input
                          type="hidden"
                          name="id"
                          value={invoice.id}
                        />

                        <button
                          type="submit"
                          className="font-medium text-red-600 hover:underline"
                        >
                          Устгах
                        </button>
                      </form>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {rows.length === 0 && (
          <p className="p-5 text-center text-slate-500">
            Илэрц олдсонгүй.
          </p>
        )}
      </div>

      {/* Хуудаслалт */}
      <nav
        aria-label="Хуудаслалт"
        className="flex flex-wrap gap-2"
      >
        {Array.from(
          { length: pages },
          (_, index) => index + 1
        ).map((number) => (
          <Link
            key={number}
            href={`?query=${encodeURIComponent(
              params.query || ''
            )}&page=${number}`}
            className={`rounded-lg border px-4 py-2 ${
              number === currentPage
                ? 'bg-blue-700 text-white'
                : 'bg-white'
            }`}
          >
            {number}
          </Link>
        ))}
      </nav>
    </section>
  );
}
