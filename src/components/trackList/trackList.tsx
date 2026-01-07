import type { Track } from "../../types/types";

export function TrackList({
  tracks,
  children,
  onClick,
  onPlayList,
}: {
  children: React.ReactNode;
  tracks: Track[];
  onClick: (track: Track) => void;
  onPlayList?: boolean;
}) {
  return (
    <div className="flex flex-col bg-violet-400 text-white p-4 gap-2 w-80">
      <div>{children}</div>
      <div className="flex flex-col gap-2">
        {tracks.map((track) => (
          <Track
            key={track.id}
            track={track}
            onClick={onClick}
            onPlayList={onPlayList}
          />
        ))}
      </div>
    </div>
  );
}

function Track({
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
      className="flex flex-row justify-between border p-4 rounded-lg cursor-pointer"
      onClick={() => onClick(track)}
    >
      <div>
        <p>{track.name}</p>
        <p>{track.artists.map((artist) => artist.name).join(", ")}</p>
        <p>{track.album.name}</p>
      </div>
      <button className="text-3xl">{onPlayList ? "-" : "+"}</button>
    </div>
  );
}
