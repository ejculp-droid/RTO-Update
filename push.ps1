# Quick Git Push Script
# Just run: .\push.ps1 "your commit message"

param(
    [string]$message = "Updated website"
)

git add .
git commit -m $message
git push

Write-Host "✅ Changes pushed to GitHub!" -ForegroundColor Green
Write-Host "Site will update in 1-2 minutes at: https://ejculp-droid.github.io/ma-advisory-website/" -ForegroundColor Cyan
