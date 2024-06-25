import { z } from 'zod'

// We're keeping a simple non-relational schema here.
export const statuses = [ "done", "doing", "todo", "backlog"] as const;
export const labels = ["study", "life", "exercise"] as const;
export const priorities = ["low", "medium", "high"] as const;
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  title: z.string(),
  status: z.enum(statuses),
  label: z.enum(labels),
  priority: z.enum(priorities),
  description:z.string(),
})

export type TaskType = z.infer<typeof taskSchema>
