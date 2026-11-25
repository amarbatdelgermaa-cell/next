// ТАЙЛБАР: Төлөв paid бол ногоон, бусад тохиолдолд шар тэмдэглэгээ харуулна.

export default function InvoiceStatus({
  status,
}: {
  status: string;
}) {
  // paid гэдэг нь төлөгдсөн гэсэн утгатай.
  const isPaid = status === 'paid';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6px 14px',
        borderRadius: '999px',
        fontSize: '13px',
        fontWeight: 600,
        // Нөхцөл үнэн бол ногоон, худал бол шар дэвсгэр сонгоно.
        backgroundColor: isPaid ? '#dcfce7' : '#fef3c7',
        color: isPaid ? '#166534' : '#92400e',
      }}
    >
      {isPaid ? 'Төлөгдсөн' : 'Төлөгдөөгүй'}
    </span>
  );
}
