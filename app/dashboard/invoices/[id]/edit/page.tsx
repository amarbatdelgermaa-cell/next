// ТАЙЛБАР: Сонгосон нэхэмжлэхийн мэдээллийг авч засах форм нээнэ.

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
  const params = await searchParams;

  const query = (params.query || '').toLowerCase();
  const page = Math.max(1, Number(params.page) || 1);

  // Нэхэмжлэхүүдийг авах, хайх
  const data = (await getInvoices()).filter((invoice) =>
    `${invoice.customer_name} ${invoice.customer_email} ${invoice.status} ${invoice.amount}`
      .toLowerCase()
      .includes(query)
  );

  // Хуудас бүрд 5 нэхэмжлэх харуулах
  const pageSize = 5;
  const pages = Math.max(1, Math.ceil(data.length / pageSize));
  const currentPage = Math.min(page, pages);

  const rows = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <section>
      {/* Гарчиг болон нэмэх товч */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Нэхэмжлэх</h1>

        {!isDemo() && (
          <Link
            href="/dashboard/invoices/create"
            className="rounded-lg bg-blue-700 px-4 py-3 text-white hover:bg-blue-800"
          >
            + Шинэ нэхэмжлэх
          </Link>
        )}
      </div>

      {/* Хайлт */}
      <form className="mb-5 flex flex-wrap gap-2">
        <label htmlFor="query" className="sr-only">
          Нэхэмжлэх хайх
        </label>

        <input
          id="query"
          name="query"
          defaultValue={params.query || ''}
          placeholder="Хэрэглэгч, төлөвөөр хайх..."
          className="w-full max-w-lg rounded-lg border p-3"
        />

        <button
          type="submit"
          className="rounded-lg bg-slate-200 px-4 py-3 hover:bg-slate-300"
        >
          Хайх
        </button>
      </form>

      {isDemo() && (
        <p className="mb-4 text-sm text-amber-700">
          Жишээ өгөгдлийн горим: PostgreSQL холбосны дараа
          нэмэх, засах, устгах боломжтой.
        </p>
      )}

      {/* Нэхэмжлэхийн хүснэгт */}
      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100">
            <tr>
              {[
                'Хэрэглэгч',
                'Имэйл',
                'Дүн',
                'Төлөв',
                'Огноо',
                'Үйлдэл',
              ].map((heading) => (
                <th key={heading} className="p-4">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-t hover:bg-slate-50"
              >
                <td className="p-4 font-medium">
                  {invoice.customer_name}
                </td>

                <td className="p-4">
                  {invoice.customer_email}
                </td>

                <td className="p-4">
                  ${(invoice.amount / 100).toFixed(2)}
                </td>

                {/* Төлөвийг өнгөтэй харуулах */}
                <td className="p-4">
                  <InvoiceStatus status={invoice.status} />
                </td>

                <td className="p-4">
                  {invoice.date}
                </td>

                <td className="p-4">
                  {!isDemo() && (
                    <div className="flex gap-2">
                      <Link
                        href={`/dashboard/invoices/${invoice.id}/edit`}
                        className="text-blue-700 hover:underline"
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
                          className="text-red-600 hover:underline"
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
          <p className="p-5">Илэрц олдсонгүй.</p>
        )}
      </div>

      {/* Хуудаслалт */}
      <nav
        aria-label="Хуудаслалт"
        className="mt-6 flex gap-2"
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
