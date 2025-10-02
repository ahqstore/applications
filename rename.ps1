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
        $OriginalName = $_.FullName
        $NewName = "$($_.FullName).png"

        # IMPORTANT: The '-WhatIf' flag prevents actual renaming. 
        # Remove it ONLY when you are ready to apply the changes.
        Rename-Item -Path $OriginalName -NewName $NewName -WhatIf

        # For actual execution, use: 
        # Rename-Item -Path $OriginalName -NewName $NewName
    }
    
    Write-Host "Completed rename check for '$Repo'." -ForegroundColor Green
}

Write-Host "`nMass rename process finished. Remember to remove '-WhatIf' to apply changes." -ForegroundColor Cyan
