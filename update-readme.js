const { promises: fs } = require("fs");
const path = require("path");
const { exec } = require("child_process");
const util = require("util");
const execAsync = util.promisify(exec);

const readmePath = path.join(__dirname, "README.md");

function getTodayDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
}

async function commitToGitHub() {
  try {
    const date = getTodayDate();
    // Configuration pour s'assurer que les commits sont bien comptabilisés
    await execAsync('git config --global user.name "Martialdepaul"');
    await execAsync('git config --global user.email "votre-email@example.com"');

    // Ajout et commit des modifications
    await execAsync("git add README.md");
    await execAsync(
      `git commit -m "docs: 📅 mise à jour quotidienne ${date} [bot]"`
    );
    await execAsync("git push origin main");

    console.log("✅ Mise à jour pushée sur GitHub avec succès !");
  } catch (error) {
    console.error("❌ Erreur lors du push vers GitHub :", error);
  }
}

async function main() {
  try {
    const readmeContent = await fs.readFile(readmePath, "utf-8");
    const dateRegex = /##\s*📅\s*\*\*Mise à jour du jour\*\*\s*:\s*\d{2}\/\d{2}\/\d{4}/i;
    const newDateLine = `## 📅 **Mise à jour du jour** : ${getTodayDate()}`;

    if (!dateRegex.test(readmeContent)) {
      console.error("❌ Aucune date trouvée dans le README !");
      return;
    }

    const updatedContent = readmeContent.replace(dateRegex, newDateLine);

    if (readmeContent !== updatedContent) {
      await fs.writeFile(readmePath, updatedContent, "utf-8");
      console.log("📝 README mis à jour avec succès !");
      await commitToGitHub();
    } else {
      console.log(
        "ℹ️ La date est déjà à jour. Aucune modification nécessaire."
      );
    }
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour :", error);
  }
}

main();
