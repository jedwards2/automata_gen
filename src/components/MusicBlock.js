import { useEffect } from "react";

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
  useEffect(() => {
    if (active && currentSelected) {
      playNote(note);
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
