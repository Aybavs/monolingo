"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks";
import { cn } from "@/lib/utils";
import { registerSchema } from "@/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import type { z } from "zod";
export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  // React Hook Form ayarları
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  // AuthContext üzerinden register fonksiyonunu alıyoruz
  const { register } = useAuth();

  // Form gönderildiğinde çalışacak fonksiyon
  async function onSubmit(values: z.infer<typeof registerSchema>) {
    await register(values.username, values.email, values.password);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>Sign up with your Google account</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              {/* Google ile devam et */}
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full">
                  {/* Google ikonu */}
                  <Image
                    className="mr-2 dark:invert"
                    src="/google.svg"
                    alt="Google logo"
                    width={16}
                    height={16}
                    priority
                  />
                  Sign up with Google
                </Button>
              </div>

              {/* Bölücü çizgi */}
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>

              {/* Form alanları */}
              <div className="grid gap-6">
                {/* Username */}
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    {...form.register("username")}
                  />
                  {form.formState.errors.username && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.username.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    {...form.register("email")}
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Your password"
                    {...form.register("password")}
                  />
                  {form.formState.errors.password && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Re-enter your password"
                    {...form.register("confirmPassword")}
                  />
                  {form.formState.errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Terms (düzenlenmiş) */}
                <div className="grid gap-1">
                  <label htmlFor="terms" className="flex items-start gap-2">
                    {/* Checkbox boyutu ayarı */}
                    <input
                      id="terms"
                      type="checkbox"
                      className="h-4 w-4 accent-primary cursor-pointer"
                      checked={form.watch("terms")}
                      onChange={(e) => form.setValue("terms", e.target.checked)}
                    />
                    {/* Yazı boyutu ve aralık ayarı */}
                    <span className="text-sm text-gray-300 leading-tight">
                      I accept the{" "}
                      <a
                        href="/terms-of-service"
                        className="underline underline-offset-4 hover:text-primary"
                      >
                        Terms of Service
                      </a>
                    </span>
                  </label>
                  {form.formState.errors.terms && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.terms.message}
                    </p>
                  )}
                </div>

                {/* Submit Butonu */}
                <Button type="submit" className="w-full">
                  Sign up
                </Button>
              </div>

              {/* Alt link */}
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/auth/login" className="underline underline-offset-4">
                  Log in
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our{" "}
        <a href="/terms-of-service">Terms of Service</a> and{" "}
        <a href="/privacy-policy">Privacy Policy</a>.
      </div>
    </div>
  );
}
