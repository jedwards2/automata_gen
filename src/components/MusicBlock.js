import { useEffect, useState } from "react";
import * as Tone from "tone";

function MusicBlock({
  row,
  column,
  active,
  gridState,
  currentSelected,
  switchBlock,
  setGridState,
  playNote,
}) {
  //synth is stored in state and only created once at
  //start of program to prevent multiple copies created on each re-render
  const [synth, setSynth] = useState();

  //when rendered, check if note should sound
  useEffect(() => {
    if (active && currentSelected && synth) {
      playNote("B2", synth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, currentSelected]);

  useEffect(() => {
    setSynth(new Tone.PolySynth(Tone.Synth).toDestination());
  }, []);

  return (
    <div
      className={`music-block ${active ? "on" : "off"} ${
        currentSelected ? "selected" : ""
      }`}
      onClick={() => switchBlock(row, column, gridState, setGridState)}
    ></div>
  );
}

export default MusicBlock;
