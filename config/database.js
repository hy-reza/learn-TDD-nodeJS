const {
    DB_USER = 'postgres',
    DB_PASSWORD = 'urpass',
    DB_NAME = 'challenge8',
    DB_HOST = 'localhost',
    DB_URL = 'postgresql://postgres:I2RzBEyBgEp2s2QfEANY@containers-us-west-128.railway.app:6634/railway',
} = process.env;

module.exports = {
    development: {
        username: DB_USER,
        password: DB_PASSWORD,
        database: `${DB_NAME}`,
        host: DB_HOST,
        dialect: 'postgres',
    },
    test: {
        url: DB_URL,
    },
    production: {
        url: DB_URL,
    },
};
