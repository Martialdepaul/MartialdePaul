const { promises: fs } = require("fs");
const path = require("path");

const readmePath = path.join(__dirname, "README.md"); // Assurez-vous que ce chemin est correct

const today = new Date();

// Fonction pour générer le nouveau README avec la date actuelle
function generateNewREADME(readme) {
  const readmeRows = readme.split("\n");

  function updateIdentifier(identifier, replaceText) {
    const identifierIndex = findIdentifierIndex(readmeRows, identifier);
    if (identifierIndex === -1) return;
    readmeRows[identifierIndex] = readmeRows[identifierIndex].replace(
      `<#${identifier}>`,
      replaceText
    );
  }

  const identifierToUpdate = {
    today_date: getTodayDate(),
  };

  Object.entries(identifierToUpdate).forEach(([key, value]) => {
    updateIdentifier(key, value);
  });

  return readmeRows.join("\n");
}

function getTodayDate() {
  return today.toDateString();
}

const findIdentifierIndex = (rows, identifier) =>
  rows.findIndex((r) => r.includes(`<#${identifier}>`));

const updateREADMEFile = (text) => fs.writeFile(readmePath, text);

// Fonction principale
async function main() {
  try {
    const readmeContent = await fs.readFile(readmePath, "utf-8"); // Lire le README.md en texte
    const newREADME = generateNewREADME(readmeContent); // Générer le nouveau contenu
    await updateREADMEFile(newREADME); // Mettre à jour le fichier README.md
    console.log("README mis à jour avec succès !");
  } catch (error) {
    console.error("Erreur lors de la mise à jour du README :", error);
  }
}

main();
