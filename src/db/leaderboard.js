const pool = require("./index.js");

const getLeaderboard = async () => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const user = await client.query(
      "SELECT * FROM users_table ORDER BY points DESC"
    );

    if (user.rows.length <= 0) {
      return [];
    }
    return user.rows;
  } catch (e) {
    console.error(e);
    return [];
  } finally {
    client.release();
  }
};

module.exports = { getLeaderboard };
