/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('users', {
        id: 'id',
        first_name: { type: 'varchar(50)', notNull: true },
        last_name: { type: 'varchar(50)', notNull: true },
    })
};

exports.down = pgm => {};
