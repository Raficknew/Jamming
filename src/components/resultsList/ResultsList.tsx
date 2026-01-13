import type { Track as TrackType } from "../../types/types";
import { Track } from "../Track/Track";

export function ResultsList({
  tracks,
  onClick,
}: {
  tracks: TrackType[];
  onClick: (track: TrackType) => void;
}) {
  return (
    <div className="flex flex-col overflow-y-auto h-160 bg-violet-400 text-white p-4 gap-2 w-80  rounded-lg min-h-0">
      <div className="flex flex-col gap-2">
        <div>
          Results
          <div className="h-px bg-white w-full" />
        </div>
      </div>
      <div className="flex flex-col gap-2 items-center">
        {tracks.length > 0 ? (
          tracks.map((track) => (
            <Track key={track.rank} track={track} onClick={onClick} />
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}
