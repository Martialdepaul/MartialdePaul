const { promises: fs } = require("fs");
const readme = require("./README.md"); // Assure-toi que le fichier README.md est bien dans le même répertoire

const msInOneDay = 1000 * 60 * 60 * 24;
const today = new Date();

function generateNewREADME() {
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

const updateREADMEFile = (text) => fs.writeFile("./README.md", text);

async function main() {
  const newREADME = generateNewREADME();
  await updateREADMEFile(newREADME);
}

main();
