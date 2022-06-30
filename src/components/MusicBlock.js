import { useEffect, useState } from "react";
import * as Tone from "tone";

function MusicBlock({
  active,
  setBlock,
  index,
  idx,
  currentSelected,
  setIndex,
  note,
  playNote,
}) {
  const [synth, setSynth] = useState();
  useEffect(() => {
    if (active && currentSelected && synth) {
      playNote(note, synth);
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
      onClick={() => setBlock(idx, index, setIndex)}
    ></div>
  );
}

export default MusicBlock;
