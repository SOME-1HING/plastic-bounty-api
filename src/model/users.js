import { sql } from "@vercel/postgres";

const addUser = async (
  uid,
  firstName,
  lastName,
  username,
  email,
  profile_pic,
  badges,
  points
) => {
  const { user } = await sql`SELECT email from users where email=${email}`;

  if (user) {
    return false;
  }

  await sql`INSERT INTO users_table (
    userid,
    first_name,
    last_name,
    username,
    email,
    profile_pic,
    badges,
    points
) VALUES (
    ${uid},
    ${firstName},
    ${lastName},
    ${username},
    ${email},
    ${profile_pic},
    ${badges},
    ${parseInt(points)}
);
`;

  return true;
};
