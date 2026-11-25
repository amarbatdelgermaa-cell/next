'use client';
// ТАЙЛБАР: Нэхэмжлэхийн хуудсанд алдаа гарвал харуулах хэсэг.
export default function InvoiceError({reset}:{error:Error&{digest?:string};reset:()=>void}){return <div role="alert"><h2>Нэхэмжлэхийн мэдээлэл ачаалсангүй.</h2><button className="bg-blue-700 text-white p-3 rounded mt-4" onClick={()=>reset()}>Дахин оролдох</button></div>}
