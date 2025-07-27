import { z } from 'zod'

export const accountValidator = z.object({
  name: z
    .string({
      required_error: 'common.required',
    })
    .min(2, {
      message: 'common.nameMinLength',
    })
    .max(30, {
      message: 'common.nameMaxLength',
    }),
  dob: z
    .any()
    .optional()
    .refine(date => date !== undefined, 'common.selectValidDate'),
  language: z
    .string()
    .min(1, 'common.selectLanguageRequired'),
})
