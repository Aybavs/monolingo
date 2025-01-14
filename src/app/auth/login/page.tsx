import React from "react";

import { LoginForm } from "@/components/forms/LoginForm";
import ToggleThemeButton from "@/components/ToggleThemeButton";

const LoginPage = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full items-center max-w-sm flex-col gap-6">
        <ToggleThemeButton />
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
