import {db} from './db';
import {customers as sampleCustomers,invoices as sampleInvoices} from './placeholder-data';
import type {Customer,Invoice,InvoiceRow} from './definitions';
export const isDemo=()=>!process.env.POSTGRES_URL;
export async function getCustomers():Promise<Customer[]>{if(isDemo())return sampleCustomers;return await db()<Customer[]>`SELECT id::text,name,email,image_url FROM customers ORDER BY name`;}
export async function getInvoices():Promise<InvoiceRow[]>{if(isDemo())return sampleInvoices.map(i=>({...i,customer_name:sampleCustomers.find(c=>c.id===i.customer_id)?.name||'',customer_email:sampleCustomers.find(c=>c.id===i.customer_id)?.email||''}));return await db()<InvoiceRow[]>`SELECT i.id::text,i.customer_id::text,i.amount,i.status,i.date::text,c.name AS customer_name,c.email AS customer_email FROM invoices i JOIN customers c ON c.id=i.customer_id ORDER BY i.date DESC,i.id DESC`;}
export async function getInvoice(id:string):Promise<Invoice|undefined>{if(isDemo())return sampleInvoices.find(i=>i.id===id);const rows=await db()<Invoice[]>`SELECT id::text,customer_id::text,amount,status,date::text FROM invoices WHERE id::text=${id} LIMIT 1`;return rows[0];}
export async function getSummary(){const [cs,ins]=await Promise.all([getCustomers(),getInvoices()]);return {customers:cs.length,invoices:ins.length,paid:ins.filter(x=>x.status==='paid').reduce((n,x)=>n+x.amount,0),pending:ins.filter(x=>x.status==='pending').reduce((n,x)=>n+x.amount,0)};}

// Лаб №7: сарын орлогын мэдээлэл. SQL нь зөвхөн шаардлагатай мөрүүдийг авна.
export async function fetchRevenue():Promise<{month:string;revenue:number}[]>{
 if(isDemo()){
  const months=Array.from({length:12},(_,i)=>{const d=new Date();d.setDate(1);d.setMonth(d.getMonth()-(11-i));return d.toISOString().slice(0,7)});
  return months.map(month=>({month,revenue:sampleInvoices.filter(x=>x.date.slice(0,7)===month&&x.status==='paid').reduce((s,x)=>s+x.amount,0)}));
 }
 const rows=await db()<{month:string;revenue:number}[]>`SELECT TO_CHAR(date_trunc('month',date),'YYYY-MM') AS month, COALESCE(SUM(amount),0)::int AS revenue FROM invoices WHERE status='paid' AND date>=CURRENT_DATE-INTERVAL '12 months' GROUP BY 1 ORDER BY 1`;
 const byMonth=new Map(rows.map(r=>[r.month,Number(r.revenue)]));
 return Array.from({length:12},(_,i)=>{const d=new Date();d.setDate(1);d.setMonth(d.getMonth()-(11-i));const month=d.toISOString().slice(0,7);return {month,revenue:byMonth.get(month)||0};});
}
export const fetchLatestInvoices=async()=> (await getInvoices()).slice(0,5);
export const fetchCardData=getSummary;
