import { z } from "zod";
import { passwordSchema } from "@/schemas/passwords";

export const loginSchema = z.object({
  username: z.string().nonempty("Kullanıcı adı zorunludur"),
  email: z.string().email("Geçerli bir e-posta adresi girin."),
  password: passwordSchema,
});
