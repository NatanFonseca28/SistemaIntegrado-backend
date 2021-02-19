exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.integer('idDpto').references('id').inTable('dpto')
        table.string('nickname').notNull().unique()
        table.string('email').notNull()
        table.string('password').notNull()
        table.boolean('admin').notNull().defaultTo(false)
        table.string('iamgeUrl', 1000)

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')
};