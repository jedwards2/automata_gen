import { useEffect } from "react";

function MusicBlock({
  active,
  setBlock,
  index,
  idx,
  playNote,
  currentSelected,
  setIndex,
}) {
  useEffect(() => {
    if (active && currentSelected) {
      playNote("C1");
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
