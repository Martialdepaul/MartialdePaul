const { promises: fs } = require("fs");
const path = require("path");

const readmePath = path.join(__dirname, "README.md");

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
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
}

const findIdentifierIndex = (rows, identifier) =>
  rows.findIndex((r) => r.includes(`<#${identifier}>`));

const updateREADMEFile = (text) => fs.writeFile(readmePath, text);

// Fonction principale
async function main() {
  try {
    const readmeContent = await fs.readFile(readmePath, "utf-8");
    const newREADME = generateNewREADME(readmeContent);
    await updateREADMEFile(newREADME);
    console.log("README mis à jour avec succès !");
  } catch (error) {
    console.error("Erreur lors de la mise à jour du README :", error);
  }
}

main();
