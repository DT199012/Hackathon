require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const { google } = require("googleapis");
const app = express();
const port = 3000;

const spreadsheetId = process.env.SPREADSHEET_ID;
const cors = require("cors");
app.use(cors());
// Load service account key
const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

app.use(bodyParser.json());

app.post("/save-user", async (req, res) => {
  const { email, username, points } = req.body;
  const signupDate = new Date().toISOString();

  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = spreadsheetId; // <- Replace this

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:D",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[email, username, signupDate, points]],
      },
    });

    res.status(200).send("User data saved successfully!");
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Something went wrong");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});