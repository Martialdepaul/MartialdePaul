const { promises: fs } = require("fs");
const path = require("path");

const readmePath = path.join(__dirname, "README.md");
const today = new Date();

function generateNewREADME(readme) {
  return readme.replace(/<#today_date>/g, getTodayDate());
}

function getTodayDate() {
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${day}/${month}/${year}`;
}

async function main() {
  try {
    const readmeContent = await fs.readFile(readmePath, "utf-8");
    const newREADME = generateNewREADME(readmeContent);
    await fs.writeFile(readmePath, newREADME);
    console.log("README mis à jour avec succès !");
  } catch (error) {
    console.error("Erreur lors de la mise à jour du README :", error);
  }
}

main();
