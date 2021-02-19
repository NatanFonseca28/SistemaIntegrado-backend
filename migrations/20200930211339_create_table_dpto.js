exports.up = function(knex, Promise) {
    return knex.schema.createTable('dpto', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('dptoEmail').notNull()

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('dpto')
};