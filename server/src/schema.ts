import { z } from 'zod';

// Vehicle schema
export const vehicleSchema = z.object({
  id: z.number(),
  license_plate: z.string(),
  make: z.string(),
  model: z.string(),
  year: z.number().int(),
  vin: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Vehicle = z.infer<typeof vehicleSchema>;

// Input schema for creating vehicles
export const createVehicleInputSchema = z.object({
  license_plate: z.string().min(1, "License plate is required"),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
  vin: z.string().min(17).max(17, "VIN must be exactly 17 characters")
});

export type CreateVehicleInput = z.infer<typeof createVehicleInputSchema>;

// Input schema for updating vehicles
export const updateVehicleInputSchema = z.object({
  id: z.number(),
  license_plate: z.string().min(1).optional(),
  make: z.string().min(1).optional(),
  model: z.string().min(1).optional(),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1).optional(),
  vin: z.string().min(17).max(17).optional()
});

export type UpdateVehicleInput = z.infer<typeof updateVehicleInputSchema>;

// Inspector schema
export const inspectorSchema = z.object({
  id: z.number(),
  name: z.string(),
  employee_id: z.string(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Inspector = z.infer<typeof inspectorSchema>;

// Input schema for creating inspectors
export const createInspectorInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  employee_id: z.string().min(1, "Employee ID is required"),
  email: z.string().email().nullable(),
  phone: z.string().nullable()
});

export type CreateInspectorInput = z.infer<typeof createInspectorInputSchema>;

// Input schema for updating inspectors
export const updateInspectorInputSchema = z.object({
  id: z.number(),
  name: z.string().min(1).optional(),
  employee_id: z.string().min(1).optional(),
  email: z.string().email().nullable().optional(),
  phone: z.string().nullable().optional()
});

export type UpdateInspectorInput = z.infer<typeof updateInspectorInputSchema>;

// Inspection status enum
export const inspectionStatusEnum = z.enum(["Good", "Needs Repair", "Damaged"]);
export type InspectionStatus = z.infer<typeof inspectionStatusEnum>;

// Inspection point type enum
export const inspectionPointTypeEnum = z.enum([
  "Engine", 
  "Tires", 
  "Lights", 
  "Interior", 
  "Exterior", 
  "Brakes", 
  "Fluid Levels"
]);
export type InspectionPointType = z.infer<typeof inspectionPointTypeEnum>;

// Inspection point schema
export const inspectionPointSchema = z.object({
  id: z.number(),
  inspection_id: z.number(),
  point_type: inspectionPointTypeEnum,
  status: inspectionStatusEnum,
  notes: z.string().nullable(),
  created_at: z.coerce.date()
});

export type InspectionPoint = z.infer<typeof inspectionPointSchema>;

// Inspection schema
export const inspectionSchema = z.object({
  id: z.number(),
  vehicle_id: z.number(),
  inspector_id: z.number(),
  inspection_date: z.coerce.date(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Inspection = z.infer<typeof inspectionSchema>;

// Inspection with relations
export const inspectionWithDetailsSchema = z.object({
  id: z.number(),
  vehicle_id: z.number(),
  inspector_id: z.number(),
  inspection_date: z.coerce.date(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  vehicle: vehicleSchema,
  inspector: inspectorSchema,
  inspection_points: z.array(inspectionPointSchema)
});

export type InspectionWithDetails = z.infer<typeof inspectionWithDetailsSchema>;

// Input schema for creating inspections
export const createInspectionInputSchema = z.object({
  vehicle_id: z.number(),
  inspector_id: z.number(),
  inspection_date: z.coerce.date(),
  inspection_points: z.array(z.object({
    point_type: inspectionPointTypeEnum,
    status: inspectionStatusEnum,
    notes: z.string().nullable()
  }))
});

export type CreateInspectionInput = z.infer<typeof createInspectionInputSchema>;

// Input schema for updating inspections
export const updateInspectionInputSchema = z.object({
  id: z.number(),
  vehicle_id: z.number().optional(),
  inspector_id: z.number().optional(),
  inspection_date: z.coerce.date().optional()
});

export type UpdateInspectionInput = z.infer<typeof updateInspectionInputSchema>;

// Input schema for creating/updating inspection points
export const createInspectionPointInputSchema = z.object({
  inspection_id: z.number(),
  point_type: inspectionPointTypeEnum,
  status: inspectionStatusEnum,
  notes: z.string().nullable()
});

export type CreateInspectionPointInput = z.infer<typeof createInspectionPointInputSchema>;

export const updateInspectionPointInputSchema = z.object({
  id: z.number(),
  point_type: inspectionPointTypeEnum.optional(),
  status: inspectionStatusEnum.optional(),
  notes: z.string().nullable().optional()
});

export type UpdateInspectionPointInput = z.infer<typeof updateInspectionPointInputSchema>;

// Query schemas
export const getVehicleByIdSchema = z.object({
  id: z.number()
});

export const getInspectorByIdSchema = z.object({
  id: z.number()
});

export const getInspectionByIdSchema = z.object({
  id: z.number()
});

export const deleteVehicleSchema = z.object({
  id: z.number()
});

export const deleteInspectorSchema = z.object({
  id: z.number()
});

export const deleteInspectionSchema = z.object({
  id: z.number()
});