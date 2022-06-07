function MusicBlock({ active, setBlock, idx }) {
  return (
    <div
      className={`music-block ${active ? "on" : "off"}`}
      onClick={() => setBlock(idx)}
    ></div>
  );
}

export default MusicBlock;
