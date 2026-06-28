# TradeDeck

Zero-cost paper trading and portfolio analytics dashboard. Built with React (Vite) + Zustand + GitHub Actions + Terraform.

**Live:** `https://<your-username>.github.io/trade-desk/`

---

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| State | Zustand |
| Tests | Vitest |
| Infrastructure | Terraform (GitHub provider) |
| CI/CD | GitHub Actions |
| Hosting | GitHub Pages |
| Cost | £0 |

---

## Repo Structure

```
trade-desk/
├── app/                        # React Vite application
│   ├── src/
│   │   ├── config/index.js     # Environment abstraction layer
│   │   ├── pages/              # Dashboard, Portfolio, Trade
│   │   ├── components/         # StockTable, TradeModal
│   │   ├── store/              # Zustand portfolio store
│   │   └── services/           # portfolioEngine.js, mockStocks.js
│   └── tests/                  # Vitest unit tests
├── infra/terraform/            # GitHub repo + environments + Pages
└── .github/workflows/          # deploy-pipeline.yml + infra-provision.yml
```

---

## Local Development

```bash
cd app
npm install
npm run dev
```

App runs at `http://localhost:5173`

Run tests:
```bash
npm test
```

---

## First-Time Setup

### 1. Create GitHub Personal Access Token

Go to: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)

Required scopes:
- `repo` (full control)
- `workflow`
- `admin:repo_hook`

### 2. Run Terraform to create GitHub repo + environments

```bash
cd infra/terraform

# Copy the example vars file and fill in your values
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your github_owner and repo_name

terraform init

# github_token is passed via CLI only — never stored in files
terraform plan -var="github_token=<your-token>"
terraform apply -var="github_token=<your-token>"
```

### 3. Configure PROD manual approval gate (GitHub UI — cannot be done via Terraform)

1. Go to your repo → **Settings** → **Environments** → **prod**
2. Check **Required reviewers**
3. Add yourself as a reviewer
4. Save

This is the manual approval gate. Every PROD deployment will pause and wait for your approval.

### 4. Add GitHub Actions variables

Go to repo → **Settings** → **Variables** → **Actions**:

| Variable | Value |
|---|---|
| `REPO_NAME` | `trade-desk` |
| `GITHUB_OWNER` | `<your-username>` |

Go to repo → **Settings** → **Secrets** → **Actions**:

| Secret | Value |
|---|---|
| `TF_GITHUB_TOKEN` | Your GitHub PAT (for Terraform workflow) |

### 5. Push code and trigger pipeline

```bash
git remote add origin https://github.com/<your-username>/trade-desk.git
git add .
git commit -m "initial commit"
git push -u origin main
```

GitHub Actions will:
1. Build the React app
2. Run Vitest tests
3. Upload build artifact (tagged with `run_id`)
4. Run DEV smoke check automatically
5. **Pause and wait for your manual approval** (prod environment)
6. Deploy to GitHub Pages after approval

---

## CI/CD Pipeline

```
push to main
     │
     ▼
┌─────────┐
│  BUILD  │  npm ci → vitest → vite build → upload artifact (run_id)
└────┬────┘
     │
     ▼
┌──────────────┐
│  DEPLOY DEV  │  auto — downloads artifact, smoke check
└──────┬───────┘
       │
       ▼
  ⏸ AWAITING MANUAL APPROVAL (prod environment)
       │
       ▼
┌───────────────┐
│  DEPLOY PROD  │  downloads SAME artifact → GitHub Pages
└───────────────┘
```

**Key principle:** Build happens once. The same immutable artifact is promoted from DEV → PROD. No rebuild.

---

## Terraform Pipeline (UI controlled)

Go to: Actions → Infra Provision → Run workflow

Select action:
- `plan` — runs terraform plan, uploads plan artifact for review
- `apply` — runs terraform apply using the plan from the same run

---

## Environment Configuration

| Variable | DEV | PROD |
|---|---|---|
| `VITE_ENV` | `dev` | `prod` |
| `VITE_BASE_PATH` | `/` | `/trade-desk/` |

Config is read via `app/src/config/index.js` using `import.meta.env`. No hardcoding.

---

## Terraform State

Using local backend (acceptable for £0 MVP).

**Security note:** `terraform.tfstate` is in `.gitignore`. Do not commit it — it may contain your GitHub token in plaintext. Keep it local only.

---

## Features

- **Dashboard** — portfolio summary, market overview
- **Portfolio** — holdings table with P&L per stock, trade history
- **Trade** — buy/sell any stock with real-time portfolio updates
- Paper trading only — no real money, no external accounts
- Starting cash: $100,000

---

## Extending to Phase 2

When ready to add auth and persistent data:
1. Add Supabase (free tier) — auth + postgres
2. Replace `mockStocks.js` with Finnhub WebSocket feed
3. Move trade history from Zustand to Supabase `trade_history` table
4. Add admin panel with Supabase service role Edge Function
