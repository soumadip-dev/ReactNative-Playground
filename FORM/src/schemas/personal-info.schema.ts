import { z } from 'zod';

const PersonalInfoSchema = z.object({
  fullName: z
    .string({ message: 'Full name is required' })
    .min(2, { message: 'Full name must be at least 2 characters' })
    .max(100, { message: 'Full name must be at most 100 characters' })
    .regex(/^[a-zA-Z\s'\-\.]+$/, {
      message: 'Full name can only contain letters, spaces, hyphens, apostrophes, and periods',
    })
    .trim(),

  address: z
    .string({ message: 'Address is required' })
    .min(5, { message: 'Please enter a valid street address' })
    .max(200, { message: 'Address must be at most 200 characters' })
    .trim(),

  city: z
    .string({ message: 'City is required' })
    .min(2, { message: 'City name must be at least 2 characters' })
    .max(100, { message: 'City name must be at most 100 characters' })
    .regex(/^[a-zA-Z\s'\-\.]+$/, { message: 'Please enter a valid city name' })
    .trim(),

  postcode: z
    .string({ message: 'Postal code is required' })
    .regex(/^[A-Z0-9]{3,10}([\s\-]?[A-Z0-9]{3,7})?$/i, {
      message: 'Please enter a valid postal code',
    })
    .trim(),

  phone: z
    .string({ message: 'Phone number is required' })
    .regex(/^\+?[1-9]\d{6,14}$/, {
      message: 'Please enter a valid phone number (e.g. +1234567890)',
    })
    .trim(),
});

export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;
export { PersonalInfoSchema };
