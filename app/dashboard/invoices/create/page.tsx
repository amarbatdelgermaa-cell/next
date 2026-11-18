import InvoiceForm from '@/app/ui/invoices/invoice-form';import {getCustomers} from '@/app/lib/data';import {createInvoice} from '@/app/lib/actions';
export default async function Create(){const customers=await getCustomers();return <div><h1 className="text-3xl font-bold mb-6">Нэхэмжлэх үүсгэх</h1><InvoiceForm customers={customers} action={createInvoice}/></div>}
