import { serial, text, pgTable, timestamp, integer, date, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Define enums for inspection status and point types
export const inspectionStatusEnum = pgEnum('inspection_status', ['Good', 'Needs Repair', 'Damaged']);
export const inspectionPointTypeEnum = pgEnum('inspection_point_type', [
  'Engine', 
  'Tires', 
  'Lights', 
  'Interior', 
  'Exterior', 
  'Brakes', 
  'Fluid Levels'
]);

// Vehicles table
export const vehiclesTable = pgTable('vehicles', {
  id: serial('id').primaryKey(),
  license_plate: text('license_plate').notNull(),
  make: text('make').notNull(),
  model: text('model').notNull(),
  year: integer('year').notNull(),
  vin: text('vin').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Inspectors table
export const inspectorsTable = pgTable('inspectors', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  employee_id: text('employee_id').notNull(),
  email: text('email'), // Nullable by default
  phone: text('phone'), // Nullable by default
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Inspections table
export const inspectionsTable = pgTable('inspections', {
  id: serial('id').primaryKey(),
  vehicle_id: integer('vehicle_id').notNull().references(() => vehiclesTable.id),
  inspector_id: integer('inspector_id').notNull().references(() => inspectorsTable.id),
  inspection_date: date('inspection_date').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Inspection points table
export const inspectionPointsTable = pgTable('inspection_points', {
  id: serial('id').primaryKey(),
  inspection_id: integer('inspection_id').notNull().references(() => inspectionsTable.id),
  point_type: inspectionPointTypeEnum('point_type').notNull(),
  status: inspectionStatusEnum('status').notNull(),
  notes: text('notes'), // Nullable by default
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// Define relations
export const vehiclesRelations = relations(vehiclesTable, ({ many }) => ({
  inspections: many(inspectionsTable),
}));

export const inspectorsRelations = relations(inspectorsTable, ({ many }) => ({
  inspections: many(inspectionsTable),
}));

export const inspectionsRelations = relations(inspectionsTable, ({ one, many }) => ({
  vehicle: one(vehiclesTable, {
    fields: [inspectionsTable.vehicle_id],
    references: [vehiclesTable.id],
  }),
  inspector: one(inspectorsTable, {
    fields: [inspectionsTable.inspector_id],
    references: [inspectorsTable.id],
  }),
  inspection_points: many(inspectionPointsTable),
}));

export const inspectionPointsRelations = relations(inspectionPointsTable, ({ one }) => ({
  inspection: one(inspectionsTable, {
    fields: [inspectionPointsTable.inspection_id],
    references: [inspectionsTable.id],
  }),
}));

// TypeScript types for the tables
export type Vehicle = typeof vehiclesTable.$inferSelect;
export type NewVehicle = typeof vehiclesTable.$inferInsert;

export type Inspector = typeof inspectorsTable.$inferSelect;
export type NewInspector = typeof inspectorsTable.$inferInsert;

export type Inspection = typeof inspectionsTable.$inferSelect;
export type NewInspection = typeof inspectionsTable.$inferInsert;

export type InspectionPoint = typeof inspectionPointsTable.$inferSelect;
export type NewInspectionPoint = typeof inspectionPointsTable.$inferInsert;

// Export all tables and relations for proper query building
export const tables = {
  vehicles: vehiclesTable,
  inspectors: inspectorsTable,
  inspections: inspectionsTable,
  inspection_points: inspectionPointsTable,
};