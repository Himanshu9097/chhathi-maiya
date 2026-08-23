#!/bin/bash

# Ensure we're in the project root
cd "$(dirname "$0")/.."

echo "Extracting frames from videos..."

for i in "01" "02" "03" "04" "05" "06" "07" "08"; do
  VIDEO="public/videos/${i}.mp4"
  OUTDIR="public/frames/chapter-${i}"
  
  if [ ! -f "$VIDEO" ]; then
    echo "Video $VIDEO not found, skipping."
    continue
  fi

  echo "Processing $VIDEO..."
  mkdir -p "$OUTDIR"
  
  # Extract frames at 24fps, scaled to 1280 width to save space, outputting as JPEG
  # Using -q:v 3 for good balance of quality/size
  ffmpeg -y -i "$VIDEO" -vf "fps=24,scale=1280:-1" -q:v 3 "$OUTDIR/frame-%04d.jpg"
done

echo "Frame extraction complete!"
