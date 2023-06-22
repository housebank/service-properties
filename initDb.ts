import { FastifyInstance, FastifyPluginCallback, FastifyPluginOptions } from 'fastify';

const fp = require('fastify-plugin');

function initializeDatabaseTableWithBaseSettingsPlugin(fastify: FastifyInstance, opts: FastifyPluginOptions,
                                            done: FastifyPluginCallback) {
  fastify.decorate('initializeDatabaseTableWithBaseSettings', async () => {
    const { serviceName } = opts;
    // @ts-ignore
    const { knex } = fastify;
    try{
      // @ts-ignore
      const exists = await knex.schema.hasTable(serviceName);
      if (!exists) {
        // @ts-ignore
        const createTable = await knex.schema.createTable(serviceName, (table: any) => {
          table.increments('id').primary();
          table.string('property_type').notNullable();
          table.text('description').notNullable();
          table.text('address').notNullable();
          table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now(6));
          table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now(6));
          table.specificType('media', 'integer[]');
          table.string('city').notNullable();
          table.string('country').notNullable();
          table.decimal('price', 10, 2).notNullable();
          table.boolean('availability').defaultTo(false);
          table.boolean('verified').defaultTo(false);
          table.boolean('deleted').defaultTo(false);
          table.integer('owner_id').unsigned().notNullable();
          table.string('size').notNullable();
          table.integer('bedrooms').notNullable();
          table.integer('bathrooms').notNullable();
          table.specificType('amenities', 'text[]').notNullable();
          table.integer('rating_id');
          table.specificType('reviews', 'text[]');
          table.specificType('bookings', 'integer[]');
          table.specificType('history', 'integer[]').defaultTo([0]);
          table.integer('listed_by').unsigned().notNullable();
          table.specificType('tags', 'text[]');
          table.foreign("owner_id").references("id").inTable("user").onDelete("CASCADE");
          table.foreign("listed_by").references("id").inTable("user").onDelete("CASCADE");
        });
        fastify.log.info('Database Table with name ' + serviceName + ' was created ==> ' + exists);
        return createTable;
      }
      fastify.log.info('Database Table with name ' + serviceName + ' exists ==> ' + exists);
      return exists;
    }catch (error : any) {
      fastify.log.error('Error in database ' + serviceName,  error.message);
      throw new Error(error.message);
    }
  });
  // @ts-ignore
  done();
}

module.exports = fp(initializeDatabaseTableWithBaseSettingsPlugin,
  { fastify: '>=1.0.0', name: 'database-plugin' });