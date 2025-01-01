import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(8, "Şifreniz en az 8 karakter olmalı.")
  .max(255, "Şifreniz 255 karakteri aşamaz.")
  .refine((password) => /[A-Z]/.test(password), {
    message: "En az bir büyük harf içermeli (A-Z).",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "En az bir küçük harf içermeli (a-z).",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "En az bir rakam içermeli (0-9).",
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: "En az bir özel karakter içermeli (!@#$%^&*).",
  });
