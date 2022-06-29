import { useEffect } from "react";
import * as Tone from "tone";

function MusicBlock({
  active,
  setBlock,
  index,
  idx,
  currentSelected,
  setIndex,
  note,
}) {
  useEffect(() => {
    const synth = new Tone.PolySynth(Tone.MembraneSynth).toDestination();
    if (active && currentSelected) {
      Tone.context.resume();
      synth.triggerAttackRelease(note, "16n");
    }
    return () => {
      synth.context._timeouts.cancel(0);
      synth.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, currentSelected]);

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
