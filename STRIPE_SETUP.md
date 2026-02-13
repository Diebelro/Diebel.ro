# Configurare Stripe pentru coș

Ca checkout-ul din coș să afișeze corect toate produsele în Stripe, setează variabilele de mediu în Vercel:

## Pași

1. **Stripe Dashboard** → [dashboard.stripe.com](https://dashboard.stripe.com)
2. **Products** → Parfum Bărbați → copiază **Price ID** (începe cu `price_`)
3. **Products** → Parfum Femei → copiază **Price ID**
4. **Vercel** → Proiectul tău → **Settings** → **Environment Variables**

Adaugă:

| Nume | Valoare |
|------|---------|
| `STRIPE_SECRET_KEY` | Cheia secretă din Stripe (sk_test_... sau sk_live_...) |
| `STRIPE_PRICE_MEN` | Price ID pentru Parfum Bărbați (price_...) |
| `STRIPE_PRICE_WOMEN` | Price ID pentru Parfum Femei (price_...) |

5. **Redeploy** proiectul după ce adaugi variabilele.

## Unde găsești Price ID

În Stripe: **Products** → click pe produs → secțiunea **Pricing** → copiază ID-ul din coloana dreaptă.
