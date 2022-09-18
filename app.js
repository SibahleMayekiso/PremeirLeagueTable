const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//File handling
const fs = require("fs");
const xlsx = require("xlsx");
const workbook = xlsx.readFile("./public/EnglishPremierLeague_Workbook.xlsx");
let worksheets = {};
for (const sheet of workbook.SheetNames) {
  worksheets[sheet] = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);
}

const port = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});

console.log(
  "JSON: \n",
  JSON.stringify(worksheets.PremierLeague2122Table),
  "\n\n"
);
app.get("/", (req, res) => {
  res.render("index");
});
