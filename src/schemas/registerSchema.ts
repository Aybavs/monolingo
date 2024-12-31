import { z } from "zod";
import { passwordSchema } from "@/schemas/passwords";

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Kullanıcı adı en az 3 karakter olmalıdır")
      .nonempty("Kullanıcı adı zorunludur"),
    email: z.string().email("Geçerli bir e-posta adresi girin."),
    password: passwordSchema,
    confirmPassword: passwordSchema,
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms of service",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
