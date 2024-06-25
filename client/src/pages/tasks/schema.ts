import { z } from 'zod'

export const statuses = ['done', 'doing', 'todo', 'backlog'] as const
export const labels = ['life', 'exercise', 'study'] as const
export const priorities = ['low', 'medium', 'high'] as const

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  _id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  status: z.enum(statuses),
  label: z.enum(labels),
  priority: z.enum(priorities),
})

export type TaskType = z.infer<typeof taskSchema>
