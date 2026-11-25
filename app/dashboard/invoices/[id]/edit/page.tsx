// Нэхэмжлэх засах хуудас

import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  getInvoice,
  getCustomers,
} from '@/app/lib/data';

import { updateInvoice } from '@/app/lib/actions';
import InvoiceForm from '@/app/ui/invoices/invoice-form';

export default async function EditInvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. Засах нэхэмжлэхийн ID-г авна.
  const { id } = await params;

  // 2. Нэхэмжлэх болон харилцагчдын мэдээллийг авна.
  const [invoice, customers] = await Promise.all([
    getInvoice(id),
    getCustomers(),
  ]);

  // 3. Нэхэмжлэх олдохгүй бол 404 хуудас харуулна.
  if (!invoice) {
    notFound();
  }

  // 4. Засах функцэд нэхэмжлэхийн ID-г холбоно.
  const updateInvoiceWithId = updateInvoice.bind(
    null,
    id
  );

  return (
    <section>
      {/* Хуудасны гарчиг */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Нэхэмжлэх засах
        </h1>

        {/* Буцах товч */}
        <Link
          href="/dashboard/invoices"
          className="rounded-lg bg-slate-200 px-4 py-3 hover:bg-slate-300"
        >
          Буцах
        </Link>
      </div>

      {/* Нэхэмжлэх засах форм */}
      <InvoiceForm
        customers={customers}
        invoice={invoice}
        action={updateInvoiceWithId}
      />
    </section>
  );
}