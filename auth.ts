import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import {z} from 'zod';
import bcrypt from 'bcryptjs';
import {db} from './app/lib/db';
import {authConfig} from './auth.config';
import type {User} from './app/lib/definitions';
async function getUser(email:string):Promise<User|undefined>{
 if(!process.env.POSTGRES_URL)return undefined;
 const rows=await db()<User[]>`SELECT id::text,name,email,password FROM users WHERE email=${email} LIMIT 1`;
 return rows[0];
}
export const {auth,signIn,signOut,handlers}=NextAuth({...authConfig,session:{strategy:'jwt'},providers:[Credentials({async authorize(credentials){const parsed=z.object({email:z.string().email(),password:z.string().min(6)}).safeParse(credentials);if(!parsed.success)return null;const {email,password}=parsed.data;const user=await getUser(email);if(!user)return null;if(!await bcrypt.compare(password,user.password))return null;return {id:user.id,name:user.name,email:user.email};}})]});
