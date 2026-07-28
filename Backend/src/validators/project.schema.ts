// ============================= Used to validate project details =============================

import z from "zod"
import { projectStatus } from "../models/Project.model.js"

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

// Was z.enum(["started", ...]) — a plain string-literal union. Mongoose's
// ProjectDocument.status is typed as the `projectStatus` TS enum, which is
// nominally typed: a matching string literal isn't assignable to it without
// a cast. z.nativeEnum derives the Zod type from the same enum the model
// uses, so parsed.data.status is actually typed `projectStatus`, and
// ProjectModel.create(parsed.data) type-checks with no cast needed.
const ProjectStatusEnum = z.nativeEnum(projectStatus)

const ProjectZodSchema = z.object({
    user: z
        .string()
        .regex(objectIdRegex, "Invalid User ID"),

    name: z
        .string()
        .trim()
        .min(2, "Project name should have at least 2 characters")
        .max(120),

    stack: z
        .string()
        .trim()
        .min(1, "Stack is required"),

    status: ProjectStatusEnum.default(projectStatus.STARTED),

    progress: z
        .number()
        .min(0, "Progress cannot be negative")
        .max(100, "Progress cannot exceed 100")
        .default(0),

    dueDate: z.coerce.date().nullable().optional(),
})

// For PATCH requests — every field optional, but at least one must actually be sent
const ProjectUpdateSchema = ProjectZodSchema.partial().refine(
    (data) => Object.keys(data).length > 0,
    { message: "At least one field is required to update" }
)

export { ProjectZodSchema, ProjectUpdateSchema, ProjectStatusEnum }

export type ProjectInput = z.infer<typeof ProjectZodSchema>;
export type ProjectUpdateInput = z.infer<typeof ProjectUpdateSchema>;