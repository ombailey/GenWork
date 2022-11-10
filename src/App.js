import "./App.css";
import workouts from "./workouts.json";
import sets from "./workoutsets.json";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDumbbell,
  faPersonRays,
  faListOl,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <div>
      <h1 className="title">GenWork</h1>
      <Generator />
    </div>
  );
}

function Generator() {
  const [workoutList, changeWorkoutList] = useState();

  const randomize = () => {
    // Error Message

    if (
      document.querySelector(".num-exercises").value === "" ||
      [...document.querySelectorAll(".body-part")].filter(
        (item) => item.checked
      ).length === 0
    ) {
      document.querySelector(".error").style.visibility = "visible";
      changeWorkoutList("");
      document.querySelector(".workout-heading").style.visibility = "hidden";
    } else {
      // Get body parts to workout and num of exercises for each body part
      let bodyParts = [];
      let num = document.querySelector(".num-exercises").value;
      let count = 0;
      let exercises = [];
      let workout = "";
      document.querySelectorAll(".body-part").forEach((part) => {
        if (part.checked) bodyParts.push(part.value);
      });

      // Generate random workout
      for (let part of bodyParts) {
        while (count < num) {
          var exercise =
            workouts[part][Math.floor(Math.random() * workouts[part].length)];
          var inside = true;

          while (inside) {
            if (exercises.includes(exercise)) {
              exercise =
                workouts[part][
                  Math.floor(Math.random() * workouts[part].length)
                ];
            } else {
              exercises.push(exercise);
              inside = false;
            }
          }
          count++;
        }
        let workoutSet =
          sets.sets[Math.floor(Math.random() * sets.sets.length)];
        workout += exercises.join("\n") + "\n\n" + `${workoutSet}` + "\n\n";
        count = 0;
        exercises = [];
        workoutSet = "";
      }
      changeWorkoutList(workout);
      document.querySelector(".workout-heading").style.visibility = "visible";

      // Reset input values back to empty
      document
        .querySelectorAll(".body-part")
        .forEach((item) => (item.checked = false));
      document.querySelector(".num-exercises").value = "";
      if (document.querySelector(".error").style.visibility === "visible")
        document.querySelector(".error").style.visibility = "hidden";
    }
  };

  return (
    <div id="generator-div">
      <div className="body-exercises">
        <h2 className="form-titles">
          <FontAwesomeIcon icon={faPersonRays} className="form-imgs" /> Body
          Part(s) to Workout
        </h2>

        <label>
          <input type="checkbox" value="abs" className="body-part" /> Abs
        </label>
        <label>
          <input type="checkbox" value="back" className="body-part" /> Back
        </label>
        <label>
          <input type="checkbox" value="biceps" className="body-part" /> Biceps
        </label>
        <label>
          <input type="checkbox" value="chest" className="body-part" /> Chest
        </label>
        <label>
          <input type="checkbox" value="legs" className="body-part" /> Legs
        </label>
        <label>
          <input type="checkbox" value="shoulders" className="body-part" />{" "}
          Shoulders
        </label>
        <label>
          <input type="checkbox" value="triceps" className="body-part" />{" "}
          Triceps
        </label>
      </div>
      <div className="exercise-count">
        <h2 className="form-titles">
          <FontAwesomeIcon icon={faListOl} className="form-imgs" /> Number Of
          Exercises
        </h2>
        <input
          type="number"
          placeholder="1"
          size={1}
          min={1}
          max={8}
          className="num-exercises"
          required
        ></input>
      </div>
      <button onClick={randomize}>
        Generate <FontAwesomeIcon icon={faDumbbell} />
      </button>
      <p className="error">Error: Invalid Values</p>
      <WOD workoutList={workoutList} changeWorkoutList={changeWorkoutList} />
    </div>
  );
}

function WOD({ workoutList }) {
  return (
    <div className="wod-heading">
      <p className="workout-heading">
        Workout Of The Day:{" "}
        <span className="time">{new Date().toLocaleDateString()}</span>{" "}
        <FontAwesomeIcon icon={faCalendarDay} className="calendar" />
      </p>
      <pre>{workoutList}</pre>
    </div>
  );
}

export default App;
