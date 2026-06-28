# ── Repository-level variables (non-sensitive) ────────────────────────────────
resource "github_actions_variable" "repo_name" {
  repository    = github_repository.trade_desk.name
  variable_name = "REPO_NAME"
  value         = var.repo_name
}

resource "github_actions_variable" "owner" {
  repository    = github_repository.trade_desk.name
  variable_name = "REPO_OWNER"
  value         = var.github_owner
}

# ── Repository-level secrets (sensitive) ──────────────────────────────────────
resource "github_actions_secret" "tf_github_token" {
  repository      = github_repository.trade_desk.name
  secret_name     = "TF_GITHUB_TOKEN"
  value           = var.github_token
}
