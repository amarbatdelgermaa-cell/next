import postgres from 'postgres';import bcrypt from 'bcryptjs';
const url=process.env.POSTGRES_URL;if(!url){console.error('POSTGRES_URL тохируулаагүй байна.');process.exit(1)}
const sql=postgres(url,{max:1});
try{
await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto`;
await sql`CREATE TABLE IF NOT EXISTS users(id uuid PRIMARY KEY DEFAULT gen_random_uuid(),name text NOT NULL,email text UNIQUE NOT NULL,password text NOT NULL)`;
await sql`CREATE TABLE IF NOT EXISTS customers(id uuid PRIMARY KEY DEFAULT gen_random_uuid(),name text NOT NULL,email text UNIQUE NOT NULL,image_url text NOT NULL DEFAULT '/avatars/person.svg')`;
await sql`CREATE TABLE IF NOT EXISTS invoices(id uuid PRIMARY KEY DEFAULT gen_random_uuid(),customer_id uuid NOT NULL REFERENCES customers(id),amount integer NOT NULL CHECK(amount>0),status text NOT NULL CHECK(status IN ('pending','paid')),date date NOT NULL DEFAULT CURRENT_DATE)`;
const email=process.env.SEED_USER_EMAIL;const password=process.env.SEED_USER_PASSWORD;
if(!email||!password||password.length<8)throw new Error('SEED_USER_EMAIL болон 8+ тэмдэгттэй SEED_USER_PASSWORD тохируулна уу.');
const hash=await bcrypt.hash(password,12);await sql`INSERT INTO users(name,email,password) VALUES ('Demo Admin',${email},${hash}) ON CONFLICT(email) DO UPDATE SET password=EXCLUDED.password`;
for(const [name,mail] of [['Bat-Erdene','bat@example.com'],['Saruul','saruul@example.com'],['Anu','anu@example.com'],['Temuulen','temuulen@example.com'],['Nomin','nomin@example.com'],['Enkhjin','enkhjin@example.com']])await sql`INSERT INTO customers(name,email) VALUES (${name},${mail}) ON CONFLICT(email) DO NOTHING`;
const count=await sql`SELECT count(*)::int AS total FROM invoices`;if(count[0].total===0){const cs=await sql`SELECT id FROM customers ORDER BY name`;for(let i=0;i<12;i++)await sql`INSERT INTO invoices(customer_id,amount,status,date) VALUES (${cs[i%cs.length].id},${(i+2)*1595},${i%3===0?'pending':'paid'},CURRENT_DATE-${i}::integer)`;}
console.log('Өгөгдлийн сан бэлэн. Нэвтрэх имэйл:',email);
}catch(e){console.error(e);process.exitCode=1}finally{await sql.end()}
