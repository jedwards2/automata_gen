import { useEffect } from "react";

function MusicBlock({ active, setBlock, idx, playNote, currentSelected }) {
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
      onClick={() => setBlock(idx)}
    ></div>
  );
}

export default MusicBlock;
