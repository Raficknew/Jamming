import type { Track } from "../../types/types";

export function TrackList({
  tracks,
  children,
  onClick,
  onPlayList,
  sendPlaylist,
  playListName,
}: {
  children: React.ReactNode;
  tracks: Track[];
  onClick: (track: Track) => void;
  onPlayList?: boolean;
  sendPlaylist?: () => void;
  playListName?: string;
}) {
  return (
    <div className="flex flex-col overflow-y-auto h-160 bg-violet-400 text-white p-4 gap-2 w-80  rounded-lg min-h-0">
      <div className="flex flex-col gap-2">
        <div>
          {children}
          <div className="h-px bg-white w-full" />
        </div>
        {onPlayList && playListName && tracks.length > 0 && (
          <button
            className="w-full bg-violet-500 rounded-full"
            onClick={sendPlaylist}
          >
            Create Playlist
          </button>
        )}
      </div>
      <div className="flex flex-col gap-2 items-center">
        {tracks.length > 0 ? (
          tracks.map((track) => (
            <Track
              key={track.rank}
              track={track}
              onClick={onClick}
              onPlayList={onPlayList}
            />
          ))
        ) : (
          <p>{onPlayList ? "No tracks in playlist" : "No tracks"}</p>
        )}
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
      className="flex flex-row justify-between border p-4 rounded-lg cursor-pointer w-full"
      onClick={() => onClick(track)}
    >
      <div>
        <p>{track.title}</p>
        <p>{track.artist}</p>
        <p>This week: {track.weeks_on_chart}</p>
      </div>
      <button className="text-3xl">{onPlayList ? "-" : "+"}</button>
    </div>
  );
}
