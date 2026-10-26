#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const startServer = require('../src/server');

const args = process.argv.slice(2);
const jsonFileArg = args[0];

if (!jsonFileArg || jsonFileArg === '--help' || jsonFileArg === '-h') {
  console.log(`
  🚀 Dumpy - Zero-config API Mocker

  Usage:
    npx mock-drop <json-file> [port]

  Example:
    npx mock-drop data.json 3000
  `);
  process.exit(0);
}

const filePath = path.resolve(process.cwd(), jsonFileArg);

if (!fs.existsSync(filePath)) {
  console.error(`❌ Error: File '${jsonFileArg}' not found in the current directory.`);
  process.exit(1);
}

let dbData;
try {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  dbData = JSON.parse(fileContent);
} catch (error) {
  console.error(`❌ Error: Failed to parse JSON file. Ensure the JSON format is valid..`);
  console.error(error.message);
  process.exit(1);
}

const port = args[1] ? parseInt(args[1], 10) : 4000;

startServer(dbData, port);