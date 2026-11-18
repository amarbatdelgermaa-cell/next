import {Suspense} from 'react';import LoginForm from '../ui/login-form';
export default function Login(){return <main className="min-h-screen grid place-items-center p-5"><div className="w-full max-w-md"><div className="rounded-t-2xl bg-blue-700 p-8 text-white text-3xl font-black">Acme</div><Suspense fallback={<p>Уншиж байна...</p>}><LoginForm/></Suspense></div></main>}
