require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Team = require("./models/team");

const port = process.env.PORT || 3000;
const url = process.env.DATABASE_CONN_URL;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

//DB Setup
const mongoose = require("mongoose");
mongoose.connect(url);
const selectDB = mongoose.connection;
selectDB.on("error", () => {
  console.log("An error occured! Please try again later.");
});
selectDB.once("open", () => {
  console.log("Database successfully opened");
});

//File handling
const fs = require("fs");
const xlsx = require("xlsx");
const workbook = xlsx.readFile("./public/EnglishPremierLeague_Workbook.xlsx");
let worksheets = {};
for (const sheet of workbook.SheetNames) {
  worksheets[sheet] = xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);
}
//Clean DB
const deleteAll = async () => {
  try {
    await Team.deleteMany({});
    console.log("Success");
  } catch (error) {
    console.log(error);
  }
};

deleteAll();

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});

// console.log(
//   "JSON: \n",
//   JSON.stringify(worksheets.PremierLeague2122Table),
//   "\n\n"
// );
app.get("/", async (req, res) => {
  //DB Data storage
  for (const value of worksheets.PremierLeague2122Table) {
    //Do something
    const addTeam = new Team({
      position: value.Position,
      team: value.Team,
      gamesPlayed: value.GamesPlayed,
      goalsScored: value.GoalsScored,
      goalsConceeded: value.GoalsConceeded,
      goalDifference: value.GoalDifference,
      points: value.Points,
    });
    try {
      addTeam.save();
    } catch (error) {
      console.log(`An error occured:\n ${error}`);
    }
  }

  const dbList = await Team.find();
  console.log(dbList);
  deleteAll();
  res.render("index", { teams: dbList });
});
