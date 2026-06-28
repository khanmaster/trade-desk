variable "github_token" {
  description = "GitHub Personal Access Token (classic) with repo + admin:repo_hook scopes"
  type        = string
  sensitive   = true
  
}

variable "github_owner" {
  description = "GitHub username or organisation"
  type        = string
  default = "KhanMaster"
}

variable "repo_name" {
  description = "Repository name to create"
  type        = string
  default     = "trade-desk"
}
