import { z } from 'zod'

export const userStatusSchema = z.enum(['active', 'inactive', 'invited', 'suspended'])
export type UserStatus = z.infer<typeof userStatusSchema>

export const userRoleSchema = z.enum(['superadmin', 'admin', 'cashier', 'manager'])
export type UserRole = z.infer<typeof userRoleSchema>

export const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  status: userStatusSchema,
  role: userRoleSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type User = z.infer<typeof userSchema>

export const userListSchema = z.array(userSchema)
