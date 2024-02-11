const pool = require("./index.js");

const addTicket = async (
  problem_category,
  problem_description,
  latitude,
  longitude,
  reporter_id,
  incident_pic
) => {
  const client = await pool.connect();

  let success = false;

  try {
    await client.query("BEGIN");

    await client.query(
      `INSERT INTO tickets_table  (
        problem_category, problem_description, latitude, longitude, reporter_id, report_date, incident_pic, status
  ) VALUES (
    $1, $2, $3, $4, $5, NOW() AT TIME ZONE 'IST', $6, 'active'
  );`,
      [
        problem_category,
        problem_description,
        latitude,
        longitude,
        reporter_id,
        incident_pic,
      ]
    );

    const user = await client.query(
      "SELECT * FROM users_table WHERE userid=$1",
      [reporter_id]
    );

    if (user.rows > 0) {
      if (user.rows[0]["badges"] === "") {
        await client.query(
          `UPDATE users_table SET badges = 'first', points = points + 10 WHERE userid=$1`,
          [reporter_id]
        );
      } else {
        await client.query(
          `UPDATE users_table SET points = points + 10 WHERE userid=$1`,
          [reporter_id]
        );
      }
    }

    await client.query("COMMIT");
    success = true;
  } catch (e) {
    await client.query("ROLLBACK");
    success = false;
    throw e;
  } finally {
    client.release();
  }

  return success;
};

const getTickets = async () => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const user = await client.query(`SELECT * FROM tickets_table`);

    await client.query("COMMIT");
    return user.rows;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

module.exports = { addTicket, getTickets };
