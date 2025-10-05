import { z } from 'zod';

export const eventTypeEnum = z.enum(['click', 'compra', 'visita']).optional().or(z.string().min(1));

export const createEventSchema = z.object({
  type: z.string().min(1),
  value: z.number(),
  date: z.union([z.string().min(1), z.date()]),
  userId: z.number().int().nonnegative(),
});

export const updateEventSchema = createEventSchema.partial();

export type CreateEventDto = z.infer<typeof createEventSchema>;
export type UpdateEventDto = z.infer<typeof updateEventSchema>;
