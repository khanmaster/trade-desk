terraform {
  required_providers {
    github = {
      source  = "integrations/github"
      version = "~> 6.0"
    }
  }

  # MVP: local state (acceptable for £0 constraint)
  # WARNING: do NOT commit terraform.tfstate if it contains your GitHub token
  backend "local" {}
}

provider "github" {
  token = var.github_token
  owner = var.github_owner
}
