#!/bin/bash
# Double-click launcher: starts the Revenue Architects Astro site locally for QA.
# First time only, you may need to allow it to run (see Step 2 in Claude's checklist).

REPO="/Users/laurabroooks/Downloads/git/ra-home-dev"

cd "$REPO" || {
  echo "Could not find the repo at:"
  echo "  $REPO"
  echo "Open this file in a text editor and fix the REPO path, then try again."
  echo ""
  read -n 1 -s -r -p "Press any key to close."
  exit 1
}

echo "Starting the Revenue Architects dev server from:"
echo "  $REPO"
echo ""
echo "Installing dependencies if needed (first run can take a minute)..."
npm install --no-audit --no-fund

echo ""
echo "Launching. When you see a 'localhost' address below, open it in your browser."
echo "Then visit /  (home) and /home-demo to see the page."
echo "Press Control-C in this window to stop the server when you're done."
echo ""
npm run dev
