import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';

// Import schemas
import { 
  createVehicleInputSchema,
  updateVehicleInputSchema,
  getVehicleByIdSchema,
  deleteVehicleSchema,
  createInspectorInputSchema,
  updateInspectorInputSchema,
  getInspectorByIdSchema,
  deleteInspectorSchema,
  createInspectionInputSchema,
  updateInspectionInputSchema,
  getInspectionByIdSchema,
  deleteInspectionSchema,
  updateInspectionPointInputSchema
} from './schema';

// Import handlers
import { createVehicle } from './handlers/create_vehicle';
import { getVehicles } from './handlers/get_vehicles';
import { getVehicleById } from './handlers/get_vehicle_by_id';
import { updateVehicle } from './handlers/update_vehicle';
import { deleteVehicle } from './handlers/delete_vehicle';

import { createInspector } from './handlers/create_inspector';
import { getInspectors } from './handlers/get_inspectors';
import { getInspectorById } from './handlers/get_inspector_by_id';
import { updateInspector } from './handlers/update_inspector';
import { deleteInspector } from './handlers/delete_inspector';

import { createInspection } from './handlers/create_inspection';
import { getInspections } from './handlers/get_inspections';
import { getInspectionById } from './handlers/get_inspection_by_id';
import { updateInspection } from './handlers/update_inspection';
import { deleteInspection } from './handlers/delete_inspection';
import { updateInspectionPoint } from './handlers/update_inspection_point';
import { getInspectionsByVehicle } from './handlers/get_inspections_by_vehicle';
import { getInspectionsByInspector } from './handlers/get_inspections_by_inspector';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  // Health check
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),

  // Vehicle routes
  createVehicle: publicProcedure
    .input(createVehicleInputSchema)
    .mutation(({ input }) => createVehicle(input)),

  getVehicles: publicProcedure
    .query(() => getVehicles()),

  getVehicleById: publicProcedure
    .input(getVehicleByIdSchema)
    .query(({ input }) => getVehicleById(input.id)),

  updateVehicle: publicProcedure
    .input(updateVehicleInputSchema)
    .mutation(({ input }) => updateVehicle(input)),

  deleteVehicle: publicProcedure
    .input(deleteVehicleSchema)
    .mutation(({ input }) => deleteVehicle(input.id)),

  // Inspector routes
  createInspector: publicProcedure
    .input(createInspectorInputSchema)
    .mutation(({ input }) => createInspector(input)),

  getInspectors: publicProcedure
    .query(() => getInspectors()),

  getInspectorById: publicProcedure
    .input(getInspectorByIdSchema)
    .query(({ input }) => getInspectorById(input.id)),

  updateInspector: publicProcedure
    .input(updateInspectorInputSchema)
    .mutation(({ input }) => updateInspector(input)),

  deleteInspector: publicProcedure
    .input(deleteInspectorSchema)
    .mutation(({ input }) => deleteInspector(input.id)),

  // Inspection routes
  createInspection: publicProcedure
    .input(createInspectionInputSchema)
    .mutation(({ input }) => createInspection(input)),

  getInspections: publicProcedure
    .query(() => getInspections()),

  getInspectionById: publicProcedure
    .input(getInspectionByIdSchema)
    .query(({ input }) => getInspectionById(input.id)),

  updateInspection: publicProcedure
    .input(updateInspectionInputSchema)
    .mutation(({ input }) => updateInspection(input)),

  deleteInspection: publicProcedure
    .input(deleteInspectionSchema)
    .mutation(({ input }) => deleteInspection(input.id)),

  // Inspection point routes
  updateInspectionPoint: publicProcedure
    .input(updateInspectionPointInputSchema)
    .mutation(({ input }) => updateInspectionPoint(input)),

  // Additional query routes for inspection history
  getInspectionsByVehicle: publicProcedure
    .input(getVehicleByIdSchema)
    .query(({ input }) => getInspectionsByVehicle(input.id)),

  getInspectionsByInspector: publicProcedure
    .input(getInspectorByIdSchema)
    .query(({ input }) => getInspectionsByInspector(input.id)),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`Vehicle Inspector TRPC server listening at port: ${port}`);
}

start();