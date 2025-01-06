import React from "react";

import { RegisterForm } from "@/components/forms/RegisterForm";
import ToggleThemeButton from "@/components/ToggleThemeButton";

const RegisterPage = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex items-center w-full max-w-sm flex-col gap-6">
        <ToggleThemeButton />
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
