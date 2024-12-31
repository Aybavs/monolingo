# Monolingo

Monolingo, kullanıcıların dil öğrenme sürecini daha etkili ve eğlenceli hale getirmeyi amaçlayan bir platformdur. Kullanıcılar, platform üzerinden dil öğrenme derslerine katılarak, kelime ve gramer bilgilerini pekiştirebilir. Ayrıca, platform üzerinden diğer kullanıcılarla etkileşime geçebilir, dil öğrenme süreçlerini birlikte yönetebilirler

---

## 🚀 Kurulum

### 1. Depoyu Klonla

Proje dosyalarını yerel bilgisayarınıza klonlayın:

```bash
git clone <https://github.com/Aybavs/monolingo>
cd monolingo
```

### 2. Gerekli Bağımlılıkları Yükle

Proje bağımlılıklarını yüklemek için aşağıdaki komutu çalıştırın:

```bash
npm install
```

### 3. Ortam Değişkenlerini Ayarla

.env.example dosyasını kopyalayarak bir .env dosyası oluşturun:

```bash
cp .env.example .env
```

Ardından, .env dosyasındaki değişkenleri kendi ihtiyaçlarınıza göre düzenleyin.

### 4. Veritabanını Hazırla

Prisma ile veritabanı migration işlemini yapın:

```bash
npx prisma migrate dev
```

### 5. Geliştirme Sunucusunu Başlat

Projeyi yerel sunucuda çalıştırmak için:

```bash
npm run dev
```

### 6. Uygulamayı Görüntüle

Tarayıcınızda http://localhost:3000 adresine giderek uygulamayı görüntüleyin.

---

## 📁 Dosya Yapısı

Genel dosya yapısı şu şekildedir

└── 📁prisma

&nbsp;&nbsp;&nbsp;&nbsp; └── schema.prisma

└── 📁src

&nbsp;&nbsp;&nbsp;&nbsp; └── 📁app

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; └── 📁auth

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ├── 📁learn

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ├── 📁profile

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ├── 📁settings

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ├── layout.tsx

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; └── globals.css

&nbsp;&nbsp;&nbsp;&nbsp; └── 📁components

&nbsp;&nbsp;&nbsp;&nbsp; └── 📁context

&nbsp;&nbsp;&nbsp;&nbsp; └── 📁hooks

&nbsp;&nbsp;&nbsp;&nbsp; └── 📁lib

&nbsp;&nbsp;&nbsp;&nbsp; └── 📁providers

&nbsp;&nbsp;&nbsp;&nbsp; └── 📁schemas

&nbsp;&nbsp;&nbsp;&nbsp; └── 📁services

&nbsp;&nbsp;&nbsp;&nbsp; └── 📁types

└── 📁public

└── .env

└── .env.example

└── package.json

└── tsconfig.json

---

## 📦 Kullanılan Paketler

### Ana Bağımlılıklar

- React: Kullanıcı arayüzü geliştirme.
- Next.js: React tabanlı framework.
- TailwindCSS: Stil yönetimi.
- Prisma: ORM ve veritabanı yönetimi.
- React Hook Form: Form yönetimi.
- Zod: Şema doğrulama.
- Axios: API istekleri.
- Radix UI
- @radix-ui/react- paketleri\*: Kullanıcı arayüzü bileşenleri.

### Diğer Araçlar

- React Query: Veri yönetimi.
- Recharts: Grafikler ve görselleştirme.
- Geliştirme Bağımlılıkları
- TypeScript: Tür güvenliği.
- ESLint: Kod analizi.
- TailwindCSS Animate: Animasyon desteği.

---

## 🔧 Faydalı Komutlar

- Bağımlılıkları güncelleme:

```bash
npm update
```

- Prisma Studio ile veritabanını görüntüleme:

```bash
npx prisma studio
```

- Build alma :

```bash
npm run build
```

---

## 🛠 Geliştirme İpuçları

- Tüm UI bileşenleri `/src/components/ui` dizininde yer almaktadır.

- API servisleri `/src/services`dizininde organize edilmiştir.

- Ortak tipler `/src/types` dizininde bulunmaktadır.

- Tema ayarları ve değişimi `/src/providers/ThemeProvider.tsx` dosyası ile yapılmaktadır.

---

## 🌟 Katkıda Bulunma

Proje ile ilgili geri bildirimler ve katkılarınız için lütfen bir **pull request** oluşturun veya bir **issue** açın.

---

## 📄 Lisans

Bu proje MIT lisansı altında dağıtılmaktadjson.

---

## 📝 Katkıda Bulunanlar

- Aybars Mete Keleş
- Burhan İsmail Demir
- Muhammet İbrahim Uğurlu
- Eren Özcan
