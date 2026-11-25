// ТАЙЛБАР: Өгөгдлийн сан холбогдоогүй үед ашиглах жишээ мэдээлэл.
import type {Customer,Invoice} from './definitions';
export const customers:Customer[]=[
{id:'c1',name:'Bat-Erdene',email:'bat@example.com',image_url:'/avatars/person.svg'},
{id:'c2',name:'Saruul',email:'saruul@example.com',image_url:'/avatars/person.svg'},
{id:'c3',name:'Anu',email:'anu@example.com',image_url:'/avatars/person.svg'},
{id:'c4',name:'Temuulen',email:'temuulen@example.com',image_url:'/avatars/person.svg'},
{id:'c5',name:'Nomin',email:'nomin@example.com',image_url:'/avatars/person.svg'},
{id:'c6',name:'Enkhjin',email:'enkhjin@example.com',image_url:'/avatars/person.svg'}];
export const invoices:Invoice[]=[
{id:'i1',customer_id:'c1',amount:15795,status:'pending',date:'2026-10-01'},
{id:'i2',customer_id:'c2',amount:20348,status:'paid',date:'2026-10-02'},
{id:'i3',customer_id:'c3',amount:45800,status:'paid',date:'2026-10-03'},
{id:'i4',customer_id:'c4',amount:12500,status:'pending',date:'2026-10-04'},
{id:'i5',customer_id:'c5',amount:37990,status:'paid',date:'2026-10-05'},
{id:'i6',customer_id:'c6',amount:7990,status:'pending',date:'2026-10-06'},
{id:'i7',customer_id:'c1',amount:32000,status:'paid',date:'2026-10-07'},
{id:'i8',customer_id:'c3',amount:22900,status:'pending',date:'2026-10-08'}];
