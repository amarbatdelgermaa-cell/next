'use client';
// ТАЙЛБАР: Хажуу цэсний холбоосуудыг харуулна.
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import clsx from 'clsx';
import {LayoutDashboard,Receipt,Users} from 'lucide-react';
const links=[{href:'/dashboard',name:'Нүүр',Icon:LayoutDashboard},{href:'/dashboard/invoices',name:'Нэхэмжлэх',Icon:Receipt},{href:'/dashboard/customers',name:'Хэрэглэгч',Icon:Users}];
export default function NavLinks(){const pathname=usePathname();return <nav className="flex md:flex-col gap-2">{links.map(({href,name,Icon})=><Link key={href} href={href} className={clsx('flex items-center gap-3 rounded-lg p-3 hover:bg-blue-50 text-sm',{'bg-sky-100 text-blue-600':pathname===href})}><Icon size={19}/>{name}</Link>)}</nav>}
