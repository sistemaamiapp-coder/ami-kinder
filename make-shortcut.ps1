$ErrorActionPreference = 'Stop'
$root = "C:\Users\Venceslau's\Documents\Qoder\2026-11-10\98a51d7b"
Add-Type -AssemblyName System.Drawing
$src = [System.Drawing.Image]::FromFile("$root\assets\ami-kinder.jpg")
$bmp = New-Object System.Drawing.Bitmap 256, 256
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($src, 0, 0, 256, 256)
$g.Dispose(); $src.Dispose()
$ms = New-Object System.IO.MemoryStream
$bmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
$png = $ms.ToArray(); $ms.Dispose()
$ico = New-Object System.IO.MemoryStream
$bw = New-Object System.IO.BinaryWriter($ico)
$bw.Write([UInt16]0); $bw.Write([UInt16]1); $bw.Write([UInt16]1)
$bw.Write([byte]0); $bw.Write([byte]0)
$bw.Write([byte]0); $bw.Write([byte]0)
$bw.Write([UInt16]1); $bw.Write([UInt16]32)
$bw.Write([UInt32]$png.Length); $bw.Write([UInt32]22)
$bw.Write($png)
$bw.Flush()
[System.IO.File]::WriteAllBytes("$root\assets\ami-kinder.ico", $ico.ToArray())
$bw.Dispose(); $ico.Dispose()
$desktop = [Environment]::GetFolderPath('Desktop')
$ws = New-Object -ComObject WScript.Shell
$lnk = $ws.CreateShortcut("$desktop\Credenciamento AMi Kinder.lnk")
$lnk.TargetPath = "$root\index.html"
$lnk.IconLocation = "$root\assets\ami-kinder.ico, 0"
$lnk.Description = "Cadastro de criancas e etiquetas 100x30 mm"
$lnk.Save()
Write-Host "shortcut-created: $desktop\Credenciamento AMi Kinder.lnk"