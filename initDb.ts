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
          table.string('property_type');
          table.text('description');
          table.text('address');
          table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now(6));
          table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now(6));
          table.specificType('media', 'integer[]');
          table.string('city');
          table.string('country');
          table.decimal('price', 10, 2);
          table.boolean('availability');
          table.boolean('verified');
          table.integer('owner_id').unsigned();
          table.string('size');
          table.integer('bedrooms');
          table.integer('bathrooms');
          table.specificType('amenities', 'text[]');
          table.integer('rating_id');
          table.specificType('reviews', 'text[]');
          table.specificType('bookings', 'integer[]');
          table.integer('listed_by').unsigned();
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