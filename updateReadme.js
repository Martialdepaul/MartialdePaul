const { promises: fs } = require("fs");
const path = require("path");

const readmePath = path.join(__dirname, "README.md"); // Assurez-vous que ce chemin est correct

const msInOneDay = 1000 * 60 * 60 * 24;
const today = new Date();

// Fonction pour générer le nouveau README avec la date actuelle
function generateNewREADME(readme) {
  const readmeRow = readme.split("\n");

  function updateIdentifier(identifier, replaceText) {
    const identifierIndex = findIdentifierIndex(readmeRow, identifier);
    if (!readmeRow[identifierIndex]) return;
    readmeRow[identifierIndex] = readmeRow[identifierIndex].replace(
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

  return readmeRow.join("\n");
}

function getTodayDate() {
  return today.toDateString();
}

const findIdentifierIndex = (rows, identifier) =>
  rows.findIndex((r) => Boolean(r.match(new RegExp(`<#${identifier}>`, "i"))));

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
