const pool = require("./index.js");

const getStats = async () => {
  const client = await pool.connect();

  let userCount = 0;
  let activeTicketCount = 0;
  let closedTicketCount = 0;

  try {
    await client.query("BEGIN");

    try {
      userCount = (await client.query("Select count(userid) from users_table"))
        .rows[0].count;
    } catch (e) {
      userCount = 0;
    }
    try {
      activeTicketCount = await client.query(
        "Select count(id) from tickets_table where status='active'"
      ).rows[0].count;
    } catch (e) {
      activeTicketCount = 0;
    }
    try {
      closedTicketCount = (
        await client.query(
          "Select count(id) from tickets_table where status='closed'"
        )
      ).rows[0].count;
    } catch (e) {
      closedTicketCount = 0;
    }

    return {
      userCount: parseInt(userCount),
      activeTicketCount: parseInt(activeTicketCount),
      closedTicketCount: parseInt(closedTicketCount),
    };
  } catch (e) {
    console.error(e);
    return {
      userCount: userCount,
      activeTicketCount: activeTicketCount,
      closedTicketCount: closedTicketCount,
    };
  } finally {
    client.release();
  }
};

module.exports = { getStats };
