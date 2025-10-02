# This script renames files in specified repository directories by appending the '.png' extension
# if the file does not already have a '.png' extension.

# --- Configuration ---

# Define the repository directories relative to the script's location or execution path
$Repos = @(
  "repo_community",
  "repo_linux",
  "repo_win32"
)

# Define the subdirectory containing the resource files
$ResourceSubDir = "db/res"

# --- Main Logic ---

Write-Host "Starting mass rename process..." -ForegroundColor Cyan

foreach ($Repo in $Repos) {
  $RootPath = Join-Path -Path $Repo -ChildPath $ResourceSubDir

  if (-not (Test-Path -Path $RootPath -PathType Container)) {
    Write-Warning "Skipping '$Repo': Directory '$RootPath' does not exist."
    continue
  }

  Write-Host "`nProcessing files in: $RootPath" -ForegroundColor Yellow

  # Get all non-directory items recursively under the resource path
  # and filter for files that do NOT already end with .png (case-insensitive)
  $FilesToRename = Get-ChildItem -Path $RootPath -File -Recurse | Where-Object {
    $_.Extension -ne ".png"
  }

  if ($FilesToRename.Count -eq 0) {
    Write-Host "No files found requiring a '.png' extension in this repository." -ForegroundColor DarkGray
    continue
  }

  $FilesToRename | ForEach-Object {
    # The path to the original file
    $OriginalPath = $_.FullName
        
    # The new file name (filename only, not the full path), which is safer for Rename-Item.
    # This resolves the "Cannot find a provider" error when using full paths in NewName.
    $NewName = "$($_.Name).png"

    # Renaming the file
    Rename-Item -Path $OriginalPath -NewName $NewName
  }
    
  Write-Host "Completed rename for '$Repo'." -ForegroundColor Green
}

Write-Host "`nMass rename process finished." -ForegroundColor Cyan
