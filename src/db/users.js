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
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const user = await client.query(
      "SELECT email FROM users_table WHERE email=$1",
      [email]
    );

    if (user.rows.length > 0) {
      return false;
    }

    await client.query(
      `INSERT INTO users_table (
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
      [uid, firstName, lastName, username, email, profile_pic, badges, points]
    );

    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }

  return true;
};
const getUser = async (uid) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const user = await client.query(
      "SELECT * FROM users_table WHERE userid=$1",
      [uid]
    );

    await client.query("COMMIT");
    return user.rows[0];
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

const getRank = async (uid) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const user = await client.query(
      "SELECT ROW_NUMBER() OVER (ORDER BY points DESC) AS rank, * FROM users_table"
    );

    await client.query("COMMIT");

    for (let i = 0; i < user.rows.length; i++) {
      if (user.rows[i]["userid"] == uid) {
        return user.rows[i]["rank"];
      }
    }
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
  return 0;
};

module.exports = { addUser, getUser, getRank };
