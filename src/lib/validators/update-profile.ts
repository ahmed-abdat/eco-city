import {z} from 'zod';

export const UpdateProfileValidator = z.object({
  email: z.string().email(),
  displayName : z.string().min(3, {
    message: 'Username must be at least 3 characters long.',
  }),
});

export type TUpdateProfileValidator = z.infer<typeof UpdateProfileValidator>;