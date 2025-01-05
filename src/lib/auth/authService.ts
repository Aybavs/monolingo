import { parseStringPromise } from "xml2js";

// SOAP endpoint URL'si
const BASE_URL = "http://localhost:4000/auth/";

const sendSoapRequest = async (xmlBody: string) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/xml; charset=utf-8",
    },
    body: xmlBody,
  });

  if (!response.ok) {
    throw new Error(
      `SOAP isteği başarısız oldu. HTTP Durum Kodu: ${response.status}`
    );
  }

  const text = await response.text();
  return parseStringPromise(text); // XML yanıtını JSON'a dönüştür
};

// Kullanıcı giriş yapma fonksiyonu
export const login = async (email: string, password: string) => {
  const soapBody = `
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://example.com/auth">
        <soap:Body>
            <tns:login>
                <email>${email}</email>
                <password>${password}</password>
            </tns:login>
        </soap:Body>
    </soap:Envelope>
  `;

  const response = await sendSoapRequest(soapBody);

  // Yanıtın içinden token'ı çıkart
  const token =
    response["soap:Envelope"]["soap:Body"][0]["tns:loginResponse"][0][
      "tns:token"
    ][0];

  // Token'ı cookie'ye kaydet
  document.cookie = `token=${token}; path=/; secure; sameSite=Strict;`;

  return token; // Token'ı döndür
};

// Kullanıcı kayıt fonksiyonu
export const register = async (
  username: string,
  email: string,
  password: string
) => {
  const soapBody = `
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://example.com/auth">
        <soap:Body>
            <tns:register>
                <username>${username}</username>
                <email>${email}</email>
                <password>${password}</password>
            </tns:register>
        </soap:Body>
    </soap:Envelope>
  `;

  const response = await sendSoapRequest(soapBody);

  // Yanıtın içinden başarı bilgisini çıkart
  const success =
    response["soap:Envelope"]["soap:Body"][0]["tns:registerResponse"][0][
      "tns:success"
    ][0];

  return success === "true"; // Başarı durumunu döndür
};

// Kullanıcı çıkış yapma fonksiyonu
export const logout = async () => {
  document.cookie =
    "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; sameSite=Strict;";
};
