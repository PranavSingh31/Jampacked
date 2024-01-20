import * as z from "zod"

export const SignupValidation = z.object({
  businessname: z.string()
    .trim()
    .min(2, { message: 'Business name is too short.' })
    .max(100, { message: 'Business name is too long.' }),

  location: z.string()
    .trim()
    .min(2, { message: 'Location is too short.' })
    .max(100, { message: 'Location is too long.' })
    .regex(/^[a-zA-Z0-9\s,.'-]*$/, { message: 'Location contains invalid characters.' }),

  email: z.string()
    .trim()
    .email({ message: 'Invalid email address.' }),

  password: z.string()
    .min(8, { message: 'Password is too short. It must be at least 8 characters long.' })
    .max(128, { message: 'Password is too long. It must be less than 128 characters.' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .regex(/[\W_]/, { message: 'Password must contain at least one special character.' }),
});

// export const GoogleSignupValidation = z.object({
//   businessname: SignupValidation.shape.businessname,
//   location: SignupValidation.shape.location,
// });

export const LoginValidation = z.object({
  email: z.string()
    .trim()
    .email({ message: 'Invalid email address.' }),

  password: z.string()
    .min(8, { message: 'Password is too short. It must be at least 8 characters long.' })
    .max(128, { message: 'Password is too long. It must be less than 128 characters.' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .regex(/[\W_]/, { message: 'Password must contain at least one special character.' }),
});