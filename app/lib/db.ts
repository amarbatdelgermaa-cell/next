// ТАЙЛБАР: PostgreSQL өгөгдлийн сантай холбогдох код.
import postgres from 'postgres';
let client:ReturnType<typeof postgres>|undefined;
// Холболт анх хэрэгтэй болох үед PostgreSQL клиент үүсгэнэ.
export function db(){if(!process.env.POSTGRES_URL)throw new Error('POSTGRES_URL тохируулаагүй байна. README-г үзнэ үү.');if(!client)client=postgres(process.env.POSTGRES_URL,{max:5});return client;}
