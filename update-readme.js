const { promises: fs } = require("fs");
const path = require("path");

const readmePath = path.join(__dirname, "README.md");
const today = new Date();

// Fonction pour générer le nouveau contenu du README avec la date mise à jour
function generateNewREADME(readme) {
  return readme.replace(/<#today_date>/g, getTodayDate());
}

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

    // Mettre à jour le contenu avec la nouvelle date
    const newREADME = generateNewREADME(readmeContent);

    // Écrire les modifications dans le fichier README
    await fs.writeFile(readmePath, newREADME);
    console.log("README mis à jour avec succès !");
  } catch (error) {
    console.error("Erreur lors de la mise à jour du README :", error);
  }
}

// Appeler la fonction principale
main();
