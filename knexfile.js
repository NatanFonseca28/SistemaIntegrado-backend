// Update with your config settings.

/* module.exports = { */
/*   development: {
          client: 'sqlite3',
          connection: {
            filename: './dev.sqlite3'
          }
        },
       */
/*   staging: {
          client: 'postgresql',
          connection: {
            database: 'my_db',
            user:     'username',
            password: 'password'
          },
          pool: {
            min: 2,
            max: 10
          },
          migrations: {
            tableName: 'knex_migrations'
          }
        }, */

/*     production: { */

const {
    db
} = require('./.env')

module.exports = {
    client: "postgresql",
    connection: db,
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: "knex_migrations",
    },
    /*     } */
};