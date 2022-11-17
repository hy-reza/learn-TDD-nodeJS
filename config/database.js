const {
    DB_USER = 'postgres',
    DB_PASSWORD = 'reza157354',
    DB_NAME = 'challenge8',
    DB_HOST = 'localhost',
    DB_URL = 'postgresql://postgres:rQjwwK8WbaawRQUfGqdu@containers-us-west-122.railway.app:7625/railway',
    // DB_PORT = "5432",
} = process.env;

module.exports = {
    development: {
        username: DB_USER,
        password: DB_PASSWORD,
        database: `${DB_NAME}`,
        host: DB_HOST,
        // port: DB_PORT,
        dialect: 'postgres',
    },
    test: {
        url: DB_URL,
    },
    production: {
        url: DB_URL,
    },
};
