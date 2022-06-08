import "./App.css";
import * as Tone from "tone";
import { useState, useEffect } from "react";
import MusicBlock from "./components/MusicBlock";

function App() {
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);
  const [currentRule, setCurrentRule] = useState(122);
  const [currentIndex, setCurrentIndex] = useState([
    1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
  ]);
  const [currentSelected, setCurrentSelected] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [formState, setFormState] = useState(0);

  const synth = new Tone.PolySynth(Tone.Synth).toDestination();

  function playNote(note, time) {
    synth.triggerAttackRelease(note, "8n", time);
  }

  const music_blocks = currentIndex.map((index, idx) => {
    return (
      <MusicBlock
        key={idx}
        active={index}
        setBlock={setBlock}
        idx={idx}
        playNote={playNote}
        currentSelected={currentSelected[idx]}
      />
    );
  });

  function switchRunning() {
    if (!running) {
      Tone.Transport.start();
    } else {
      Tone.Transport.stop();
    }

    setRunning((prevState) => !prevState);
  }

  useEffect(() => {
    const loop = new Tone.Loop((time) => {
      setCount((prevCount) => prevCount + 1);

      setCurrentSelected((prevState) => {
        let index = count % prevState.length;
        let nextIndex = (count + 1) % prevState.length;
        let newState = [...prevState];

        newState[index] = !prevState[index];
        newState[nextIndex] = !prevState[nextIndex];

        if (index === currentIndex.length - 1) {
          compute_new_row();
        }

        return newState;
      });
    }, "4n");

    loop.start(0);

    return () => {
      loop.dispose();
    };
  });

  function setBlock(key) {
    let newIndex = [];
    for (let i = 0; i < currentIndex.length; i++) {
      if (i === key) {
        if (currentIndex[i] === 0) {
          newIndex[i] = 1;
        } else {
          newIndex[i] = 0;
        }
      } else {
        newIndex[i] = currentIndex[i];
      }
    }

    setCurrentIndex(newIndex);
  }

  function int_to_binary(inputted_int) {
    let new_binary_list = [];
    while (inputted_int > 0) {
      new_binary_list.push(inputted_int % 2);
      //add remainder of inputted_int to first position of binary_list
      inputted_int = Math.floor(inputted_int / 2);
      //divide inputted_int into 2 for next test
    }
    new_binary_list = new_binary_list.reverse();
    //reverse and show original list

    var addendum = 7 - new_binary_list.length;
    for (let i = 0; i <= addendum; i++) {
      new_binary_list.unshift(0);
    }
    return new_binary_list;
    //add remaining 0's onto original binary_list
  }

  function compute_new_row() {
    let a1 = 0;
    let a2 = 0;
    let a3 = 0;
    let a_full;
    let new_index = [];
    let binary_list = int_to_binary(currentRule);

    for (let i = 0; i < currentIndex.length; i++) {
      if (currentIndex[i - 1] === undefined) {
        a1 = 0;
      } else {
        a1 = currentIndex[i - 1];
      }

      a2 = currentIndex[i];

      if (currentIndex[i + 1] === undefined) {
        a3 = 0;
      } else {
        a3 = currentIndex[i + 1];
      }

      a_full = a1.toString() + a2.toString() + a3.toString();

      //creates groups of 3 (i-1, i, i+1) so that tests determining the future state can be run

      switch (a_full) {
        case "111":
          new_index[i] = binary_list[0];
          break;
        case "110":
          new_index[i] = binary_list[1];
          break;
        case "101":
          new_index[i] = binary_list[2];
          break;
        case "100":
          new_index[i] = binary_list[3];
          break;
        case "011":
          new_index[i] = binary_list[4];
          break;
        case "010":
          new_index[i] = binary_list[5];
          break;
        case "001":
          new_index[i] = binary_list[6];
          break;
        case "000":
          new_index[i] = binary_list[7];
          break;
        default:
          console.log("something has gone wrong");
        //runs test determining future and places it in new array
      }
    }
    setCurrentIndex(new_index);

    //replaces current index with contents of new index

    console.log(currentIndex);
    //posts and outputs the new row
  }

  function handleSubmit(e) {
    e.preventDefault();
    let newRule = formState;
    if (newRule > 127) {
      newRule = 126;
    }
    if (newRule < 0) {
      newRule = 0;
    }
    if (newRule) {
      setCurrentRule(newRule);
    }
  }

  return (
    <div className="App">
      <button onClick={switchRunning} className="start-stop-button">
        {running ? "Stop" : "Start"}
      </button>
      <form onSubmit={handleSubmit} className="form-div">
        <label htmlFor="numInput">Ruleset - Current: {currentRule}</label>
        <div>
          <input
            name="numInput"
            type="number"
            min="0"
            max="126"
            value={formState}
            onChange={(e) => setFormState(e.target.value)}
          ></input>
          <input type="submit" value="Submit"></input>
        </div>
      </form>
      <div className="grid-div">{music_blocks}</div>
    </div>
  );
}

export default App;
