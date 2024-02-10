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