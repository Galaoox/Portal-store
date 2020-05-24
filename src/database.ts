import { createPool, Pool } from 'mysql';

const pool: Pool = createPool({
	database: "k5n39f0i0gm7vjsl",
	host: "u3r5w4ayhxzdrw87.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
	port: 3306,
	user: "rjx5fcm2vsu5fixi",
	password: "gjd8juzi63ew286u",
});

pool.getConnection((error, connection) => {
	if (error) {
		console.log(error);
	} else {
		pool.releaseConnection(connection);
		console.log("DB IS CONNECTED")
	}
});

export default pool;