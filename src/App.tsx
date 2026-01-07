import { useEffect, useState } from "react";
import "./App.css";
import { NavBar } from "./components/navBar/navBar";
import { SearchBar } from "./components/searchBar/searchBar";
import { TrackList } from "./components/trackList/trackList";
import type { Track } from "./types/types";

const MOCK_DATA = {
  tracks: [
    {
      id: "4WNcduiCmDNfmTEz7JvmLv",
      name: "Sweater Weather",
      duration_ms: 240400,
      popularity: 92,
      album: {
        name: "I Love You.",
        images: [
          {
            url: "https://i.scdn.co/image/ab67616d0000b27382d622997632646c2f90a6f8",
          },
        ],
        release_date: "2013-04-22",
      },
      artists: [{ name: "The Neighbourhood" }],
    },
    {
      id: "5XNqz6r_F_B_P_7_Y_1",
      name: "Do I Wanna Know?",
      duration_ms: 272391,
      popularity: 90,
      album: {
        name: "AM",
        images: [
          {
            url: "https://i.scdn.co/image/ab67616d0000b2734ae074c5417a1a4f73b31362",
          },
        ],
        release_date: "2013-09-09",
      },
      artists: [{ name: "Arctic Monkeys" }],
    },
    {
      id: "4D_F_3_o_p_Q_V_2",
      name: "As It Was",
      duration_ms: 167303,
      popularity: 95,
      album: {
        name: "Harry's House",
        images: [
          {
            url: "https://i.scdn.co/image/ab67616d0000b273b46f74097655d7f353caab14",
          },
        ],
        release_date: "2022-05-20",
      },
      artists: [{ name: "Harry Styles" }],
    },
  ],
};

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [tracks, setTracks] = useState(MOCK_DATA.tracks);
  const [playlistTracks, setPlaylistTracks] = useState<Track[]>([]);

  const filteredTracks = tracks.filter((track) => {
    return playlistTracks.every(
      (plTrack: { id: string }) => plTrack.id !== track.id
    );
  });

  const addToPlaylist = (track: Track) => {
    setPlaylistTracks((prev) => [...prev, track]);
  };

  const removeFromPlaylist = (track: Track) => {
    setPlaylistTracks((prev) => prev.filter((t) => t.id !== track.id));
  };

  // useEffect(() => {
  //   const fetchTracks = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch(
  //         "https://spotify23.p.rapidapi.com/tracks/?ids=4WNcduiCmDNfmTEz7JvmLv",
  //         {
  //           method: "GET",
  //           headers: {
  //             "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
  //             "x-rapidapi-host": import.meta.env.VITE_RAPIDAPI_HOST,
  //           },
  //         }
  //       );
  //       const data = await response.json();
  //       setTracks(data.tracks);
  //     } catch (error: Error) {
  //       setError(error.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchTracks();
  // }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-violet-700 w-full h-screen flex flex-col items-center gap-10 pb-10">
      <NavBar />
      <SearchBar
        searchValue={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onSubmit={() => {}}
      />
      <div className="flex flex-row gap-4 h-full">
        <TrackList tracks={filteredTracks} onClick={addToPlaylist}>
          <p className="text-2xl">Results</p>
          <div className="h-px bg-white w-full" />
        </TrackList>
        <TrackList
          tracks={playlistTracks || []}
          onClick={removeFromPlaylist}
          onPlayList
        >
          <p className="text-2xl">Playlist</p>
        </TrackList>
      </div>
    </div>
  );
}

export default App;
