// ТАЙЛБАР: Dashboard-ийн зүүн талын цэс.
import Link from 'next/link';
import {LogOut} from 'lucide-react';
import {signOut} from '@/auth';
import NavLinks from '@/app/ui/dashboard/nav-links';
export default function Sidebar(){return <aside className="bg-white border-r w-full md:w-64 p-4 flex flex-col gap-4"><Link href="/dashboard" className="rounded-xl bg-blue-700 text-white p-6 text-3xl font-black">Acme</Link><NavLinks/><div className="md:mt-auto"><form action={async()=>{'use server';await signOut({redirectTo:'/login'});}}><button className="flex w-full items-center gap-3 rounded-lg bg-slate-100 p-3 text-sm hover:bg-slate-200"><LogOut size={19}/> Гарах</button></form></div></aside>}
