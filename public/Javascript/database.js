const {Pool} = require('pg')

const pool = new Pool({ 
    user: 'postgres',
    host: 'localhost', 
    database: 'postgres',
    password: 'postgres',
    port: 5432, 
  });

async function getCount() {
    try {
        const result = await pool.query('SELECT COUNT(*) FROM posts');
        return result.rows[0].count;
    } catch (error) {
        console.error('Error executing query:', error);
        throw new Error('Internal Server Error');
    }
}

module.exports = pool