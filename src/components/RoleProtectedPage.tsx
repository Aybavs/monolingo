import { useUser } from "@/context";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function RoleProtectedPage({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    } else if (router.pathname.startsWith("/admin") && user.role !== "admin") {
      router.push("/unauthorized");
    } else if (router.pathname.startsWith("/learn") && user.role !== "user") {
      router.push("/unauthorized");
    }
  }, [user, router]);

  return <>{user ? children : null}</>;
}
