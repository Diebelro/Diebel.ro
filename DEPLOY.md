# Cum pui site-ul Diebel Parfum pe internet (gratuit)

Site-ul este gata de deploy. Ai două variante simple:

---

## Varianta 1: Vercel (recomandat, ~2 minute)

1. **Cont Vercel**  
   Mergi pe [vercel.com](https://vercel.com) și fă cont (gratuit, cu Google/GitHub).

2. **Instalează Vercel CLI** (opțional, pentru deploy din PC):
   ```bash
   npm i -g vercel
   ```
   Apoi în folderul proiectului:
   ```bash
   vercel
   ```
   Urmează pașii (login dacă e cazul). Îți va da un link de tip `https://my-app-xxx.vercel.app`.

3. **Sau: deploy cu GitHub**
   - Încarcă proiectul pe GitHub (crează un repo și push).
   - Pe [vercel.com](https://vercel.com) → **Add New** → **Project** → importă repo-ul GitHub.
   - Lasă setările default (Build: `npm run build`, Output: `build`).
   - Deploy. După ce termină, site-ul va fi live pe un URL de tip `https://nume-proiect.vercel.app`.

---

## Varianta 2: Netlify

1. **Cont Netlify**  
   [netlify.com](https://netlify.com) → sign up (gratuit).

2. **Deploy din folder**
   - În proiect rulezi: `npm run build`
   - Pe Netlify: **Sites** → **Add new site** → **Deploy manually**
   - Trage folderul **build** în zonă (sau drag & drop pe “Deploy”).
   - După upload, primești un link: `https://random-name.netlify.app`.

3. **Sau: deploy cu GitHub**
   - Push proiectul pe GitHub.
   - Netlify → **Add new site** → **Import from Git** → alege repo-ul.
   - Build command: `npm run build`, Publish directory: `build`.
   - Deploy. Site-ul va fi la `https://nume-site.netlify.app`.

---

## Conectarea domeniului tău (ex. diebelparfum.ro)

După ce site-ul e deployat, poți folosi domeniul tău. SSL (https) e gratuit pe ambele platforme.

### Dacă folosești Vercel

1. **Vercel Dashboard** → proiectul tău → **Settings** → **Domains**.
2. Click **Add** și scrie domeniul (ex. `diebelparfum.ro` sau `www.diebelparfum.ro`).
3. **Alegi cum îl conectezi:**

   **Varianta A – Nameserver-e (cel mai simplu)**  
   - Vercel îți dă 2 nameserver-e (ex. `ns1.vercel-dns.com`, `ns2.vercel-dns.com`).  
   - La firma unde ai cumpărat domeniul (ex. ROTLD, GoDaddy, Namecheap): intră la setări domeniu → **DNS** / **Nameservers** și schimbă la nameserver-ele date de Vercel.  
   - După ce se propagă (de la câteva minute la 24–48 h), domeniul va puncta la site.

   **Varianta B – Doar înregistrări DNS (păstrezi nameserver-ele actuale)**  
   - Vercel îți arată ce înregistrări să adaugi (ex. A record sau CNAME).  
   - La provider-ul de domeniu adaugi exact acele înregistrări.  
   - Salvezi și aștepți propagarea.

4. Opțional: adaugi și `www.diebelparfum.ro` ca domeniu; Vercel poate redirecționa automat `diebelparfum.ro` → `www` sau invers.

---

### Dacă folosești Netlify

1. **Netlify Dashboard** → site-ul tău → **Domain management** → **Add custom domain**.
2. Introdu domeniul (ex. `diebelparfum.ro` sau `www.diebelparfum.ro`).
3. **Cum îl conectezi:**

   **Varianta A – Netlify DNS (simplu)**  
   - Alege **Use Netlify DNS**. Netlify îți dă nameserver-e.  
   - La firma de domeniu schimbă nameserver-ele la cele Netlify.  
   - După propagare, domeniul va merge; Netlify pune și SSL automat.

   **Varianta B – DNS la provider-ul tău**  
   - Netlify îți arată un **A record** (ex. `75.2.60.5`) sau **CNAME** (ex. `nume-site.netlify.app`).  
   - La provider-ul de domeniu adaugi acel A sau CNAME pentru `@` (domeniu gol) sau pentru `www`.  
   - Salvezi și aștepți propagarea.

4. Poți seta redirect: `diebelparfum.ro` → `www.diebelparfum.ro` (sau invers) din **Domain management** → **Options** → **HTTPS**.

---

### Rezumat

| Unde ai domeniul | Ce faci |
|------------------|--------|
| Orice registrar (ROTLD, GoDaddy, etc.) | Fie schimbi nameserver-ele la Vercel/Netlify, fie adaugi doar A/CNAME cum îți arată platforma. |
| Deja pe Vercel/Netlify | Adaugi domeniul în proiect; platforma îți spune exact pașii. |

- **HTTPS** este activat gratuit (Let’s Encrypt) pe ambele.  
- După propagare, lumea poate accesa site-ul direct la domeniul tău.

---

## Domeniul diebel.ro (DataHost / DataServer)

Domeniul tău: **diebel.ro**  
Nameserver-e actuale: ns1–ns4.dataserver.ro (Cloud Data Hosting SRL / [datahost.ro](https://www.datahost.ro)).

### Pasul 1: Deploy site-ul

Fă mai întâi deploy pe **Vercel** sau **Netlify** (vezi secțiunile de mai sus). Notează URL-ul primit (ex. `https://nume-proiect.vercel.app`).

### Pasul 2: Adaugi domeniul în Vercel sau Netlify

- **Vercel:** Proiect → **Settings** → **Domains** → **Add** → scrie `diebel.ro` și `www.diebel.ro` (ambele).
- **Netlify:** Site → **Domain management** → **Add custom domain** → adaugi `diebel.ro` și `www.diebel.ro`.

Platforma îți va spune ce înregistrări DNS sunt necesare. Apoi alegi una din variantele de mai jos.

### Pasul 3: Setări DNS la DataHost / DataServer

Intră în panoul unde administrezi domeniul diebel.ro (cont la **datahost.ro** sau la furnizorul care folosește **dataserver.ro**). Caută secțiunea **DNS**, **Zone DNS** sau **Înregistrări DNS**.

---

#### Varianta A – Păstrezi nameserver-ele actuale (ns1–ns4.dataserver.ro)

Adaugi doar înregistrările cerute de platformă.

**Dacă ai ales Vercel:**

| Tip   | Name / Host | Valoare / Target                    |
|-------|-------------|-------------------------------------|
| **A** | `@` sau gol | `76.76.21.21`                       |
| **CNAME** | `www`   | `cname.vercel-dns.com`              |

(Valorile exacte le vezi și în Vercel → Settings → Domains la diebel.ro.)

**Dacă ai ales Netlify:**

| Tip   | Name / Host | Valoare / Target                    |
|-------|-------------|-------------------------------------|
| **A** | `@` sau gol | `75.2.60.5`                         |
| **CNAME** | `www`   | **numele-site-ului-tau.netlify.app** (îl vezi în Netlify la Domain management) |

Dacă există deja înregistrări pentru `@` sau `www`, șterge-le sau modifică-le cu valorile de mai sus. Salvează și așteaptă 5–30 minute (uneori până la 24 h).

---

#### Varianta B – Schimbi nameserver-ele la Vercel sau Netlify

- **Vercel:** Settings → Domains → diebel.ro → folosește **Vercel DNS**. Îți dă 2 nameserver-e (ex. `ns1.vercel-dns.com`, `ns2.vercel-dns.com`).
- **Netlify:** Domain management → **Use Netlify DNS** → îți dă nameserver-e Netlify.

La **DataHost** (datahost.ro): domeniu diebel.ro → **Nameservers** / **Servere DNS** → înlocuiește ns1–ns4.dataserver.ro cu nameserver-ele date de Vercel sau Netlify. Salvează. Propagarea poate dura până la 24–48 h.

---

### După ce propagă

- **https://diebel.ro** și **https://www.diebel.ro** vor deschide site-ul.
- SSL (lacătul verde) e activat automat de Vercel/Netlify.

Dacă unul dintre ele nu merge, așteaptă încă 1–2 ore sau verifică în panoul Vercel/Netlify dacă domeniul e „Verified” / „Active”.

---

## După deploy

- Linkul temporar (`https://....vercel.app` sau `https://....netlify.app`) funcționează imediat; îl poți trimite oricui.
- După ce conectezi domeniul, site-ul va fi accesibil la **https://diebel.ro** și **https://www.diebel.ro**.

**Notă:** Fișierele `vercel.json` și `netlify.toml` sunt deja în proiect; rutele (`/`, `/men`, `/women`) vor funcționa corect la refresh.
