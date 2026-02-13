# Setup Recenzii cu Email Accept/Reject

Când cineva trimite o recenzie, primești un email cu linkuri pentru **Accept** sau **Respinge**.

## 1. Upstash Redis (stocare recenzii)

1. Mergi la [Upstash](https://console.upstash.com/) → Create database
2. Creează o bază Redis gratuită
3. Copiază `UPSTASH_REDIS_REST_URL` și `UPSTASH_REDIS_REST_TOKEN`
4. Adaugă-le în Vercel: Project Settings → Environment Variables

## 2. Resend (email)

1. Mergi la [Resend](https://resend.com/) → Sign up
2. Obține API Key din Dashboard → API Keys
3. **Important – trimitere la contact@diebel.ro:**
   - Cu `onboarding@resend.dev`, Resend trimite doar la adresa cu care te-ai înregistrat.
   - Pentru a primi pe **contact@diebel.ro**, verifică domeniul **diebel.ro** în Resend:
     - Dashboard → Domains → Add Domain → diebel.ro
     - Adaugă în DNS recordurile (TXT, MX) indicate de Resend
     - După verificare, setează în Vercel:
       - `FROM_EMAIL` = `Diebel Parfum <recenzii@diebel.ro>` (sau alt email @diebel.ro)
       - `OWNER_EMAIL` = `contact@diebel.ro`
4. Adaugă în Vercel:
   - `RESEND_API_KEY` = cheia ta Resend
   - `OWNER_EMAIL` = contact@diebel.ro (sau emailul unde primești recenziile)
   - `FROM_EMAIL` = (opțional) ex. `Diebel Parfum <recenzii@diebel.ro>` după ce ai verificat domeniul

## 3. Cum funcționează

1. Utilizatorul trimite recenzia → se salvează în Redis cu status „pending”
2. Primești email cu conținutul recenziei și linkuri **Accept** / **Respinge**
3. Dacă apeși **Accept** → recenzia apare pe site
4. Dacă apeși **Respinge** → recenzia nu este publicată
