'use server';
// ТАЙЛБАР: Сервер дээр ажиллах нэвтрэх, нэхэмжлэх нэмэх, засах, устгах үйлдлүүд.
import {signIn} from '@/auth';import {AuthError} from 'next-auth';import {z} from 'zod';import {db} from './db';import {isDemo} from './data';import {revalidatePath} from 'next/cache';import {redirect} from 'next/navigation';import {auth} from '@/auth';
// Нэвтрэх формын имэйл, нууц үгийг шалгах үйлдэл.
export async function authenticate(_previous:string|undefined,formData:FormData):Promise<string|undefined>{try{await signIn('credentials',formData);}catch(e){if(e instanceof AuthError)return e.type==='CredentialsSignin'?'Имэйл эсвэл нууц үг буруу байна.':'Нэвтрэх үед алдаа гарлаа.';throw e;}}
export type State={errors?:{customerId?:string[];amount?:string[];status?:string[]};message?:string|null};
// Шинэ нэхэмжлэхийн өгөгдөл зөв эсэхийг шалгах дүрэм.
const InvoiceSchema=z.object({customerId:z.string().min(1,'Хэрэглэгч сонгоно уу.'),amount:z.coerce.number().gt(0,'Дүн 0-ээс их байх ёстой.'),status:z.enum(['pending','paid'],{errorMap:()=>({message:'Төлөв сонгоно уу.'})})});
// Өөрчлөлт хийхийн өмнө нэвтэрсэн эсэхийг шалгана.
async function requireUser(){const session=await auth();if(!session?.user)throw new Error('Нэвтрэх шаардлагатай.');if(isDemo())throw new Error('Өгөгдөл хадгалахын тулд PostgreSQL тохируулна уу.');}
// Нэхэмжлэх шинээр үүсгэж өгөгдлийн санд хадгална.
export async function createInvoice(_previous:State,formData:FormData):Promise<State>{await requireUser();const parsed=InvoiceSchema.safeParse({customerId:formData.get('customerId'),amount:formData.get('amount'),status:formData.get('status')});if(!parsed.success)return {errors:parsed.error.flatten().fieldErrors,message:'Талбаруудыг шалгана уу.'};const {customerId,amount,status}=parsed.data;try{await db()`INSERT INTO invoices(customer_id,amount,status,date) VALUES (${customerId},${Math.round(amount*100)},${status},CURRENT_DATE)`;}catch{return {message:'Өгөгдлийн санд хадгалах үед алдаа гарлаа.'};}revalidatePath('/dashboard/invoices');redirect('/dashboard/invoices');}
// Байгаа нэхэмжлэхийн мэдээллийг шинэчилнэ.
export async function updateInvoice(id:string,_previous:State,formData:FormData):Promise<State>{await requireUser();const parsed=InvoiceSchema.safeParse({customerId:formData.get('customerId'),amount:formData.get('amount'),status:formData.get('status')});if(!parsed.success)return {errors:parsed.error.flatten().fieldErrors,message:'Талбаруудыг шалгана уу.'};const {customerId,amount,status}=parsed.data;try{await db()`UPDATE invoices SET customer_id=${customerId},amount=${Math.round(amount*100)},status=${status} WHERE id::text=${id}`;}catch{return {message:'Өөрчлөлт хадгалах үед алдаа гарлаа.'};}revalidatePath('/dashboard/invoices');redirect('/dashboard/invoices');}
// Сонгосон нэхэмжлэхийг өгөгдлийн сангаас устгана.
export async function deleteInvoice(formData:FormData){await requireUser();const id=String(formData.get('id')||'');await db()`DELETE FROM invoices WHERE id::text=${id}`;revalidatePath('/dashboard/invoices');}
