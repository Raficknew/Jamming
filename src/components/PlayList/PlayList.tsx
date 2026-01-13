import type { Track as TrackType } from "../../types/types";
import { Track } from "../Track/Track";

export function PlayList({
  tracks,
  onClick,
  sendPlaylist,
  inputValue,
  onInputChange,
}: {
  tracks: TrackType[];
  onClick: (track: TrackType) => void;
  sendPlaylist?: () => void;
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col overflow-y-auto h-160 bg-violet-400 text-white p-4 gap-2 w-80  rounded-lg min-h-0">
      <div className="flex flex-col gap-2">
        <div>
          <input
            type="text"
            className="text-white outline-none text-2xl"
            placeholder="Enter playlist Name..."
            value={inputValue}
            onChange={onInputChange}
            required
          />
          <div className="h-px bg-white w-full" />
        </div>
        {inputValue && tracks.length > 0 && (
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
              onPlayList
            />
          ))
        ) : (
          <p>No tracks in playlist</p>
        )}
      </div>
    </div>
  );
}
