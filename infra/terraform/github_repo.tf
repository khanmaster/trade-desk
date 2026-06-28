resource "github_repository" "trade_desk" {
  name        = var.repo_name
  description = "Zero-cost paper trading and portfolio analytics dashboard"
  visibility  = "public"

  has_issues   = true
  has_wiki     = false
  has_projects = false

  auto_init = true
}

# GitHub Pages is configured automatically by the deploy-pipeline.yml
# when peaceiris/actions-gh-pages creates the gh-pages branch on first deploy.
# Terraform cannot configure Pages before the branch exists.
