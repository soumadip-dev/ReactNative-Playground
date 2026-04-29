import { z } from 'zod';

const PaymentDetailsSchema = z.object({
  cardNumber: z
    .string({ message: 'Card number is required' })
    .min(13, { message: 'Card number must be at least 13 digits' })
    .max(19, { message: 'Card number must be at most 19 digits' })
    .regex(/^\d{13,19}$/, {
      message: 'Please enter a valid card number',
    })
    .trim(),

  expiryDate: z
    .string({ message: 'Expiry date is required' })
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
      message: 'Expiry date must be in MM/YY format',
    })
    .trim(),

  cvv: z
    .string({ message: 'cvv is required' })
    .trim()
    .min(3, { message: 'CVV must be at least 3 digits' })
    .max(4, { message: 'CVV must be at most 4 digits' }),
  saveCard: z.boolean().optional(),
});

export type PaymentInfo = z.infer<typeof PaymentDetailsSchema>;

export { PaymentDetailsSchema };
