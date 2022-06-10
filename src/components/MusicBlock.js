import { useEffect } from "react";

function MusicBlock({
  active,
  setBlock,
  index,
  idx,
  playNote,
  currentSelected,
  setIndex,
  instrument,
  note,
}) {
  useEffect(() => {
    if (active && currentSelected) {
      playNote(instrument, note);
    }
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
