const pool = require("./index.js");

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
  const { user } = await pool.query(
    "SELECT email FROM users_table WHERE email=$1",
    [email]
  );

  if (user.length > 0) {
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
    $1, $2, $3, $4, $5, $6, $7, $8
  );`,
    [uid, firstName, lastName, username, email, profile_pic, badges, points];

  return true;
};

module.exports = { addUser };
