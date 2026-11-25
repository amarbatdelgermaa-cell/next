
'use client';
// ТАЙЛБАР: Нэхэмжлэхийн хэрэглэгч, дүн, төлөв оруулах форм.

import { useActionState } from 'react';
import type { Customer, Invoice } from '@/app/lib/definitions';
import type { State } from '@/app/lib/actions';

type Action = (
  state: State,
  data: FormData
) => Promise<State>;

export default function InvoiceForm({
  customers,
  invoice,
  action,
}: {
  customers: Customer[];
  invoice?: Invoice;
  action: Action;
}) {
  const initialState: State = {
    errors: {},
    message: null,
  };

  // Форм илгээхэд серверийн хариу, алдаа болон хүлээлтийг удирдана.
  const [state, formAction, pending] = useActionState(
    action,
    initialState
  );

  return (
    <form
      action={formAction}
      noValidate
      className="max-w-2xl space-y-5 rounded-xl border bg-white p-6"
    >
      {/* Хэрэглэгч сонгох */}
      <div>
        <label
          htmlFor="customer"
          className="mb-2 block font-medium"
        >
          Хэрэглэгч
        </label>

        <select
          id="customer"
          name="customerId"
          defaultValue={invoice?.customer_id || ''}
          aria-describedby="customer-error"
          aria-invalid={Boolean(state.errors?.customerId?.length)}
          className="w-full rounded-lg border p-3"
        >
          <option value="">Хэрэглэгч сонгох</option>

          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>

        <div id="customer-error" aria-live="polite">
          {state.errors?.customerId?.map((error) => (
            <p key={error} className="text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Нэхэмжлэхийн дүн */}
      <div>
        <label
          htmlFor="amount"
          className="mb-2 block font-medium"
        >
          Дүн ($)
        </label>

        <input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          defaultValue={
            invoice
              ? (invoice.amount / 100).toFixed(2)
              : ''
          }
          aria-describedby="amount-error"
          aria-invalid={Boolean(state.errors?.amount?.length)}
          className="w-full rounded-lg border p-3"
          placeholder="Жишээ: 120.50"
        />

        <div id="amount-error" aria-live="polite">
          {state.errors?.amount?.map((error) => (
            <p key={error} className="text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </div>

      {/* Төлөв сонгох */}
      <fieldset
        aria-describedby="status-error"
        aria-invalid={Boolean(state.errors?.status?.length)}
      >
        <legend className="mb-2 font-medium">
          Төлөв
        </legend>

        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="status"
              value="pending"
              defaultChecked={invoice?.status === 'pending'}
            />
            Хүлээгдэж буй
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="status"
              value="paid"
              defaultChecked={invoice?.status === 'paid'}
            />
            Төлөгдсөн
          </label>
        </div>

        <div id="status-error" aria-live="polite">
          {state.errors?.status?.map((error) => (
            <p key={error} className="text-sm text-red-600">
              {error}
            </p>
          ))}
        </div>
      </fieldset>

      {/* Ерөнхий алдааны мэдээлэл */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="text-sm text-red-600"
      >
        {state.message}
      </div>

      {/* Хадгалах товч */}
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-blue-700 px-5 py-3 text-white hover:bg-blue-800 disabled:opacity-50"
      >
        {pending
          ? 'Хадгалж байна...'
          : invoice
            ? 'Өөрчлөлт хадгалах'
            : 'Нэхэмжлэх үүсгэх'}
      </button>
    </form>
  );
}

