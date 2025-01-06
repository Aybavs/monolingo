"use client";
import React, { useState } from "react";
import { addCredits } from "@/lib/user/userService";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  function validateForm() {
    if (!amount || !cardNumber || !expiry || !cvv) {
      alert("Lütfen tüm alanları doldurunuz.");
      return false;
    }
    if (!/^\d+$/.test(amount)) {
      alert("Lütfen geçerli bir tutar giriniz.");
      return false;
    }
    if (!/^\d{16}$/.test(cardNumber)) {
      alert("Kart numarası 16 haneli olmalıdır.");
      return false;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      alert("Son kullanma tarihi MM/YY formatında olmalıdır.");
      return false;
    }
    if (!/^\d{3}$/.test(cvv)) {
      alert("CVV 3 haneli olmalıdır.");
      return false;
    }
    return true;
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await addCredits(parseInt(amount));
      alert("Ödeme başarılı! Learn sayfasına yönlendiriliyorsunuz.");
      router.push("/learn");
    } catch (error) {
      console.error("Ödeme başarısız:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md border-4 rounded-xl shadow-lg p-8 space-y-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6">
          Ödeme Ekranı
        </h2>

        <form onSubmit={handlePayment} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Kredi Adedi
            </label>
            <input
              type="number"
              placeholder="Örn: 100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none transition-colors"
              min="1"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Kart Numarası
            </label>
            <input
              type="text"
              placeholder="**** **** **** ****"
              value={cardNumber}
              onChange={(e) => {
                const input = e.target.value.replace(/\D/g, '').slice(0, 16);
                setCardNumber(input);
              }}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Son Kullanma Tarihi
              </label>
              <input
                type="text"
                placeholder="AA/YY"
                value={expiry}
                onChange={(e) => {
                  const input = e.target.value.replace(/\D/g, '').slice(0, 4);
                  if (input.length >= 2) {
                    setExpiry(`${input.slice(0, 2)}/${input.slice(2)}`);
                  } else {
                    setExpiry(input);
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                CVV
              </label>
              <input
                type="text"
                placeholder="***"
                value={cvv}
                onChange={(e) => {
                  const input = e.target.value.replace(/\D/g, '').slice(0, 3);
                  setCvv(input);
                }}
                maxLength={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors duration-300 mt-6"
          >
            Ödemeyi Tamamla
          </button>
        </form>
      </div>
    </div>
  );
}
