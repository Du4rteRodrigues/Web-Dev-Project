const {Pool} = require('pg')

const pool = new Pool({ 
    user: 'postgres',
    host: 'localhost', 
    database: 'postgres',
    password: 'postgres',
    port: 5432, 
  });

  async function getRowsCount() {
    try {
        // Query the number of rows (Adjust the query based on your table structure)
        const result = await pool.query('SELECT COUNT(*) FROM posts');
        console.log("hehehe")
        const rowsCount = parseInt(result.rows[0].count);
        return rowsCount;
    } catch (error) {
        console.error('Error querying the database:', error);
        throw error;
    }
}

module.exports = {
    pool,
    getRowsCount,
};