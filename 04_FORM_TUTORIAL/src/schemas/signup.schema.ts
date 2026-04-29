import { z } from 'zod';

const SignUpSchema = z
  .object({
    fullName: z
      .string({ message: 'Full name is required' })
      .min(3, { message: 'Full name must be at least 3 characters' })
      .trim(),

    email: z
      .string({ message: 'Email is required' })
      .email({ message: 'Please enter a valid email address' })
      .trim(),

    password: z
      .string({ message: 'Password is required' })
      .min(6, { message: 'Password must be at least 6 characters' })
      .trim(),

    confirmPassword: z.string({ message: 'Confirm password is required' }).trim(),

    dateOfBirth: z.coerce
      .date({
        message: 'Date of birth is required',
      })
      .refine(date => date <= new Date(), {
        message: 'Date of birth cannot be in the future',
      }),

    acceptTerms: z.literal(true, {
      message: 'You must accept the terms and privacy policy',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignUpInfo = z.infer<typeof SignUpSchema>;

export { SignUpSchema };
