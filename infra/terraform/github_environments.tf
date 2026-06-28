# Creates DEV and PROD environments
# IMPORTANT: Manual approval for PROD must be configured in GitHub UI
# Go to: Settings → Environments → prod → Required reviewers → add yourself

resource "github_repository_environment" "dev" {
  repository  = github_repository.trade_desk.name
  environment = "dev"

  lifecycle {
    ignore_changes = [reviewers, deployment_branch_policy]
  }
}

resource "github_repository_environment" "prod" {
  repository  = github_repository.trade_desk.name
  environment = "prod"

  lifecycle {
    ignore_changes = [reviewers, deployment_branch_policy]
  }
}

# ── DEV environment variables ─────────────────────────────────────────────────
resource "github_actions_environment_variable" "dev_vite_env" {
  repository    = github_repository.trade_desk.name
  environment   = github_repository_environment.dev.environment
  variable_name = "VITE_ENV"
  value         = "dev"
}

# ── PROD environment variables ────────────────────────────────────────────────
resource "github_actions_environment_variable" "prod_vite_env" {
  repository    = github_repository.trade_desk.name
  environment   = github_repository_environment.prod.environment
  variable_name = "VITE_ENV"
  value         = "prod"
}
