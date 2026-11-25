// ТАЙЛБАР: Бүх хуудсыг бүрхсэн үндсэн layout: фонт, HTML болон metadata.
import type {Metadata} from 'next';
import '@/app/ui/global.css';
import {inter} from '@/app/ui/fonts';
export const metadata:Metadata={title:'Acme Dashboard • Лаб 1–13',description:'Next.js сургалтын Dashboard'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="mn"><body className={`${inter.className} antialiased`}>{children}</body></html>;}
