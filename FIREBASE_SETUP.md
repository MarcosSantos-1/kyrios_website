# Setup Firebase — Kyrios

Tudo o que você precisa fazer no Firebase Console pra o admin funcionar.

## 1. Habilitar serviços no Firebase Console

Projeto: **kyrios-dbd50**

### Authentication
1. Menu → **Authentication** → **Sign-in method**
2. Habilite **Email/Password**
3. Habilite **Email link (passwordless sign-in)** — marque a checkbox dentro do provider de Email
4. Em **Authorized domains**, adicione o domínio onde o site vai rodar (localhost já vem por padrão; adicione o domínio de produção quando deployar)

### Firestore Database
1. Menu → **Firestore Database** → **Create database**
2. Escolha **production mode**
3. Selecione região (recomendo `southamerica-east1` — São Paulo)
4. Aba **Rules** → cole o conteúdo de [`firestore.rules`](./firestore.rules) → **Publish**

### Storage
1. Menu → **Storage** → **Get started**
2. Selecione mesma região do Firestore
3. Aba **Rules** → cole o conteúdo de [`storage.rules`](./storage.rules) → **Publish**

## 2. Criar seu usuário admin

Você pode escolher um dos caminhos:

### Opção A — Criar conta com senha (Firebase Console)
1. **Authentication** → **Users** → **Add user**
2. E-mail: `marcosv.dev@outlook.com` — senha: você escolhe
3. Loga em `/admin/login` na aba "E-mail e senha"

### Opção B — Magic Link (sem precisar criar antes)
1. Vá em `/admin/login` no site
2. Aba "Magic link" → digite `marcosv.dev@outlook.com` → clique "Receber link de acesso"
3. Abra seu e-mail e clique no link → ele te leva pro admin
4. (Firebase cria o user automaticamente nessa hora)

## 3. Adicionar mais admins (ex.: o dono da loja)

Pra autorizar outro e-mail no admin:

1. **No código:** abra `.env.local` e adicione no final da lista:
   ```
   NEXT_PUBLIC_ADMIN_EMAILS=marcosv.dev@outlook.com,novo-email@dominio.com
   ```
2. **Nas regras:** edite `firestore.rules` e `storage.rules`, adicione o e-mail dentro de `isAdmin()`, e republique no Console
3. Reinicie o `npm run dev` pra carregar o .env

Depois disso, o novo admin pode usar Magic Link em `/admin/login` que ele já entra direto.

## 4. Primeiro acesso ao admin

1. `npm run dev`
2. Vá em http://localhost:3000/admin/login
3. Logue (Magic link ou senha)
4. Você cai no Dashboard
5. Como o Firestore está vazio, o site público segue mostrando os 6 produtos do código (fallback)
6. Vá em **Produtos → Importar produtos do código** → confirma. Pronto, agora tá tudo no Firestore
7. (Opcional) **Depoimentos → Importar padrão** pra subir os 3 do código
8. Edite à vontade

## 5. Cache & invalidação

- Leituras públicas usam `unstable_cache` do Next.js com TTL (1h pra produtos/depoimentos, 5min pro site config) e tags
- Cada salvar/apagar/criar no admin chama um server action que invalida a tag correta + revalida as rotas (/, /produtos)
- O resultado: a próxima requisição ao site público já pega o dado novo, sem rebuild

## 6. Estrutura de coleções no Firestore

```
products/                    ← um doc por produto, id = slug
  bustos/
    title, description, fullDescription, image (capa), images[], category,
    features[], specifications{ material, dimensions, colors[] },
    priceFrom, salePriceFrom?, leadTimeDays, tags[],
    featured?, corporate?, order, createdAt, updatedAt

testimonials/                ← um doc por depoimento
  t1/
    name, role, quote, initials, order, updatedAt

siteConfig/default           ← documento único de config global
  featuredProductId?         (qual produto é destaque na vitrine)
  vitrineEdition             ("Edição #01" etc.)
  promo { enabled, label?, discountPct? }
  heroStats { deliveredCount, approvalPct }
  heroHeadline?              (não conectado ainda — placeholder pro futuro)
  updatedAt

messages/                    ← entra aqui se um dia o formulário público for ligado
  {auto-id}/
    name, email, phone, message, createdAt
```

## 7. Próximos passos quando virar e-commerce de verdade

Tudo já está preparado para crescer:
- Coleção `orders/` (com status: em projeto → produção → despachado → entregue)
- Coleção `customers/` ou usar Firebase Auth como source of truth
- Stripe ou Mercado Pago pra checkout
- Server actions adicionais em `app/lib/actions.ts`

Os Termos de Uso e Política de Privacidade já mencionam todos esses cenários.
