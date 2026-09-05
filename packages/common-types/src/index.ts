import { z } from "zod";

// ── Zod Schemas ──────────────────────────────────────────────────────────

/** Schema for validating a new task title */
export const taskSchema = z.object({
  title: z.string().trim().min(1, "Task title cannot be empty"),
});

// ── TypeScript Types / Interfaces ────────────────────────────────────────

/** Represents a single task as stored in the database */
export type Task = {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
};

/** Shape of a task creation payload (derived from the Zod schema) */
export type TaskInput = z.infer<typeof taskSchema>;

/** Standard response from server actions */
export type ActionResult = {
  error?: string;
  success?: boolean;
};
