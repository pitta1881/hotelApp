module.exports = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    migrations: ['src/db/seeds/*{.ts,.js}'],
    migrationsTableName: 'migrations_history',
    entities: ['src/db/entities/*.ts'],
    migrationsRun: true,
    synchronize: true,
};
