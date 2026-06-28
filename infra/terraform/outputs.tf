output "repo_url" {
  value       = github_repository.trade_desk.html_url
  description = "GitHub repository URL"
}

output "pages_url" {
  value       = "https://${var.github_owner}.github.io/${var.repo_name}/"
  description = "GitHub Pages URL (live after first deployment)"
}
