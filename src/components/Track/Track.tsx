import type { Track } from "../../types/types";

export function Track({
  track,
  onClick,
  onPlayList,
}: {
  track: Track;
  onClick: (track: Track) => void;
  onPlayList?: boolean;
}) {
  return (
    <div
      className="flex flex-row justify-between border p-4 rounded-lg cursor-pointer w-full"
      onClick={() => onClick(track)}
    >
      <div>
        <p>{track.title}</p>
        <p>{track.artist}</p>
        <p>This week: {track.last_week}</p>
      </div>
      <button className="text-3xl">{onPlayList ? "-" : "+"}</button>
    </div>
  );
}
