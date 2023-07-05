import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table("property", (table)=>{
    table.string("construction_year", 4).nullable().defaultTo(null);
    table.boolean("under_construction").defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table("property", (table)=>{
    table.dropColumn("construction_year");
    table.dropColumn("under_construction");
  });
}

