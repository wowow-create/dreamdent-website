# Деплой на dreamdent.eu

## 📋 Стъпка 0: Приемете Xcode лиценза (само веднъж)

Отворете Terminal и изпълнете:
```bash
sudo xcodebuild -license
```
Напишете `agree` и натиснете Enter.

---

## 📦 Стъпка 1: Инсталирайте Node.js (ако нямате)

1. Отидете на https://nodejs.org/ и изтеглете LTS версията
2. Инсталирайте
3. Проверете: `node --version` и `npm --version`

---

## 🚀 Стъпка 2: Инсталирайте зависимостите

```bash
cd ~/Projects/dreamdent-website
npm install
```

---

## 🧪 Стъпка 3: Тествайте локално

1. Копирайте `.env.example` → `.env`
2. Попълнете `RESEND_API_KEY` (от https://resend.com)
3. Стартирайте:

```bash
npm run dev
```

4. Отворете http://localhost:4321 — сайтът е готов!
5. Admin панелът е на http://localhost:4321/keystatic

---

## 🐙 Стъпка 4: Качете в GitHub

1. Регистрирайте се на https://github.com/
2. Натиснете **New repository** → Ime: `dreamdent-website` → **Create**
3. Изпълнете в Terminal:

```bash
cd ~/Projects/dreamdent-website
git init
git add -A
git commit -m "Initial DreamDent website"
git remote add origin https://github.com/ВАШИЯТ_USERNAME/dreamdent-website.git
git push -u origin main
```

---

## ☁️ Стъпка 5: Деплой в Cloudflare Pages

1. Отидете на https://pages.cloudflare.com/ → **Create a project**
2. **Connect to Git** → Authorize Cloudflare → Изберете `dreamdent-website`
3. Build settings:
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. **Environment Variables** → Add:
   - `RESEND_API_KEY` = (от Resend)
   - `CONTACT_EMAIL` = `info@dreamdent.eu`
   - `PUBLIC_CLOUDINARY_CLOUD_NAME` = `dytkrko2h`
   - `NODE_ENV` = `production`
5. Натиснете **Save and Deploy**

Сайтът ще бъде достъпен на: `dreamdent-website.pages.dev` 🎉

---

## 🔐 Стъпка 6: GitHub OAuth App (за Admin панела в продукция)

1. В GitHub: Settings → Developer Settings → OAuth Apps → **New OAuth App**
2. Попълнете:
   - **Application name**: DreamDent Admin
   - **Homepage URL**: `https://dreamdent-website.pages.dev`
   - **Authorization callback URL**: `https://dreamdent-website.pages.dev/api/keystatic/github/oauth/callback`
3. Натиснете **Register application**
4. Копирайте **Client ID** и генерирайте **Client Secret**
5. В Cloudflare Pages → Settings → Environment Variables добавете:
   - `KEYSTATIC_GITHUB_CLIENT_ID` = Client ID
   - `KEYSTATIC_GITHUB_CLIENT_SECRET` = Client Secret
   - `KEYSTATIC_SECRET` = (произволен random string, мин. 32 символа)
   - `GITHUB_REPO_OWNER` = вашият GitHub username
   - `GITHUB_REPO_NAME` = `dreamdent-website`
6. В `keystatic.config.ts` уверете се, че repo owner/name са правилни
7. Redeploy сайта

Admin панелът ще работи на: `https://dreamdent-website.pages.dev/keystatic`

---

## 🌐 Стъпка 7: Свържете dreamdent.eu с Cloudflare

1. Регистрирайте се на https://cloudflare.com/
2. **Add a Site** → въведете `dreamdent.eu`
3. Cloudflare ще покаже нови nameservers (напр. `abby.ns.cloudflare.com`)
4. При Вашия регистратор на домейн смените nameservers
5. Изчакайте 24-48 часа за разпространение
6. В Cloudflare: **Pages** → dreamdent-website → **Custom Domains** → добавете `dreamdent.eu` и `www.dreamdent.eu`
7. SSL сертификатът се издава автоматично ✓

---

## 📧 Стъпка 8: Cloudflare Email Routing (за info@dreamdent.eu)

1. В Cloudflare Dashboard → **Email** → **Email Routing**
2. Натиснете **Enable Email Routing**
3. **Create address**: `info@dreamdent.eu` → Forward to: (вашият личен имейл)
4. Верифицирайте личния си имейл когато получите потвърждение

---

## 📸 Стъпка 9: Качете снимки от Admin панела

1. Отидете на `dreamdent.eu/keystatic`
2. Влезте с GitHub акаунта
3. Добавете:
   - Снимки на екипа
   - Клинични случаи (преди/след)
   - Блог публикации
4. Всяка промяна автоматично commit-ва в GitHub и Cloudflare Pages преизгражда сайта (~1 мин)

---

## 🔑 Resend — верификация на домейна

За да изпращате от `noreply@dreamdent.eu` вместо `onboarding@resend.dev`:

1. В https://resend.com → Domains → **Add Domain** → `dreamdent.eu`
2. Добавете посочените DNS TXT записи в Cloudflare
3. Верифицирайте
4. В `src/pages/api/contact.ts` заменете `from: 'DreamDent Website <onboarding@resend.dev>'`
   с `from: 'DreamDent <noreply@dreamdent.eu>'`

---

## 💰 Разходи: 0 лв. / год.

| Услуга           | Цена          |
|------------------|---------------|
| Cloudflare Pages | Безплатно ∞   |
| Cloudflare DNS   | Безплатно     |
| GitHub           | Безплатно     |
| Keystatic CMS    | Безплатно     |
| Resend           | Безплатно (3K имейла/мес) |
| Cloudinary       | Безплатно (25GB) |
| **Общо**         | **0 лв.**     |
