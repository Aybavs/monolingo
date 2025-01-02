import { post } from "@/services/api";

// Kullanıcı giriş yapma fonksiyonu
export const login = async (email: string, password: string) => {
  const response = await post("/auth/login", { email, password });
  const { user, token } = response;

  // Token'ı cookie'ye kaydet
  document.cookie = `token=${token}; path=/; secure; sameSite=Strict;`;

  return user; // Kullanıcı bilgisini döndür
};

// Kullanıcı çıkış yapma fonksiyonu
export const logout = async () => {
  await post("/logout"); // Logout için API çağrısı
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; sameSite=Strict;";
};

// Kullanıcı kayıt fonksiyonu
export const register = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await post("/auth/register", {
    username,
    email,
    password,
  });

  return response; // API'den gelen yanıtı döndür
};
