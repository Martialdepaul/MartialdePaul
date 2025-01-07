const { promises: fs } = require("fs");
const path = require("path");

const readmePath = path.join(__dirname, "README.md");
const today = new Date();

// Fonction pour obtenir la date actuelle au format jour/mois/année
function getTodayDate() {
  const day = String(today.getDate()).padStart(2, "0"); // Ajoute un zéro devant les jours < 10
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Mois commence à 0, donc +1
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
}

// Fonction principale qui met à jour le README
async function main() {
  try {
    // Lire le contenu actuel du README
    const readmeContent = await fs.readFile(readmePath, "utf-8");

    // Regex pour trouver et remplacer la date dans le README
    const dateRegex = /## 📅 \*\*Mise à jour du jour\*\* : \d{2}\/\d{2}\/\d{4}/;

    // Générer la nouvelle ligne avec la date actuelle
    const newDateLine = `## 📅 **Mise à jour du jour** : ${getTodayDate()}`;

    // Vérifier si le contenu doit être mis à jour
    if (!dateRegex.test(readmeContent)) {
      console.error("Aucune date trouvée dans le fichier README !");
      return;
    }

    // Remplacer la date existante par la nouvelle
    const updatedContent = readmeContent.replace(dateRegex, newDateLine);

    // Écrire uniquement si le contenu a changé
    if (readmeContent !== updatedContent) {
      await fs.writeFile(readmePath, updatedContent, "utf-8");
      console.log("README mis à jour avec succès !");
    } else {
      console.log("La date est déjà à jour. Aucune modification nécessaire.");
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du README :", error);
  }
}

// Appeler la fonction principale
main();
