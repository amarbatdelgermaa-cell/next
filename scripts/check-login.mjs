import postgres from "postgres";
import bcrypt from "bcryptjs";

const sql = postgres(process.env.POSTGRES_URL);

try {
  const email = process.env.SEED_USER_EMAIL;
  const password = process.env.SEED_USER_PASSWORD;

  const users = await sql`
    SELECT email, password
    FROM users
    WHERE email = ${email}
    LIMIT 1
  `;

  console.log("Хэрэглэгч олдсон:", users.length > 0);

  if (users.length > 0) {
    const valid = await bcrypt.compare(password, users[0].password);
    console.log("Нууц үг таарч байна:", valid);
  }
} catch (error) {
  console.error("Алдаа:", error.message);
} finally {
  await sql.end();
}
