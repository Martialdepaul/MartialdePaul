name: Daily README Update

on:
  schedule:
    - cron: "0 0 * * *" # Exécute le script tous les jours à minuit UTC
  workflow_dispatch: # Permet de déclencher manuellement le workflow

jobs:
  update-readme:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "14" # Choisis la version de Node.js que tu veux

      - name: Install Dependencies
        run: npm install

      - name: Run Update Script
        run: node updateReadme.js

      - name: Commit and Push Changes
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} # Utilisation du token GitHub Actions
        run: |
          git config --global user.name "Gabot"
          git config --global user.email "gabot@depaulmartial4@gmail.com"
          git add .  # Ajoute tous les fichiers modifiés
          git commit -m "Mise à jour quotidienne du README"
          git push https://x-access-token:${{ secrets.GITHUB_TOKEN }}@github.com/${{ github.repository }} HEAD:${{ github.ref }}
