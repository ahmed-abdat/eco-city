import {z} from 'zod';

export const PasswordValidator  = z.object({
    newPassword: z.string().min(6, {
        message: 'Password must be at least 6 characters long.',
    }),
    confirmPassword: z.string(),
  }).refine(data => data.newPassword === data.confirmPassword, {
    message: "passwords do not match",
    path: ['confirmPassword'] // specify the field that the error is attached to
});

export type TPasswordValidator = z.infer<typeof PasswordValidator>;

