//5000 steps = 1 point
//Every additional 1000 = 1 point up to 12,000
//Max of 8 points

let SHEET_ID = "1H61DMPQqZEG_0jLFAd8XwgjNnVtHyjsSyzpxY0M-JrE";
let SHEET_TITLE = "Step_Data";
let SHEET_RANGE = "A1:AE8";

let FULL_URL =
  "https://docs.google.com/spreadsheets/d/" +
  SHEET_ID +
  "/gviz/tq?&sheet=" +
  SHEET_TITLE;

fetch(FULL_URL)
  .then((res) => res.text())
  .then((rep) => {
    let data = JSON.parse(rep.substr(47).slice(0, -2));

    const rows = data.table.rows;
    let scores = [];

    for (i = 1; i < rows.length; i++) {
      let stepData = rows[i].c;

      let name = stepData[0].v;

      let totalPoints = 0;

      for (j = 1; j < stepData.length; j++) {
        const steps = stepData[j]?.v;

        let points = 0;

        if (steps >= 12000) {
          points = 8;
          totalPoints += points;
        } else if (steps >= 11000) {
          points = 7;

          totalPoints += points;
        } else if (steps >= 10000) {
          points = 6;

          totalPoints += points;
        } else if (steps >= 9000) {
          points = 5;

          totalPoints += points;
        } else if (steps >= 8000) {
          points = 4;

          totalPoints += points;
        } else if (steps >= 7000) {
          points = 3;

          totalPoints += points;
        } else if (steps >= 6000) {
          points = 2;

          totalPoints += points;
        } else if (steps >= 5000) {
          points = 1;

          totalPoints += points;
        }
      }

      const finalData = {
        name: name,
        totalPoints: totalPoints,
      };
      scores.push(finalData);
    }

    const sorted = scores.sort((a, b) =>
      a.totalPoints < b.totalPoints ? 1 : a.totalPoints > b.totalPoints ? -1 : 0
    );

    for (item of sorted) {
      const nameEl = document.createElement("li");
      const nameList = document.querySelector(".names");
      nameList.appendChild(nameEl);
      nameEl.innerHTML = item.name;
      const scoreEl = document.createElement("li");
      const scoreList = document.querySelector(".scores");
      scoreList.appendChild(scoreEl);
      scoreEl.innerHTML = item.totalPoints;
    }
  });
