import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { NavBar } from "./components/navBar/navBar";
import { SearchBar } from "./components/searchBar/searchBar";
import { PlayList } from "./components/PlayList/PlayList";
import type { Track } from "./types/types";
import { ResultsList } from "./components/resultsList/ResultsList";

const fakeEndpoint = async (title: string, playList: Track[]) => {
  if (!title || playList.length === 0) {
    alert("Playlist title and tracks are required.");
    return;
  }
  try {
    await fetch("https://FAKECREATELISTENDPOINT/createPlaylist", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        tracks: playList,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return "Created playlist successfully!";
  } catch (error) {
    return `Failed to create playlist, ${
      error instanceof Error && error.message
    }`;
  }
};

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [playlistTracks, setPlaylistTracks] = useState<Track[]>([]);
  const [playListName, setPlayListName] = useState("");

  const filteredTracks = useMemo(() => {
    return tracks.filter((track) => {
      return (
        playlistTracks.includes(track) === false &&
        (track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          track.artist.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
  }, [tracks, playlistTracks, searchQuery]);

  const addToPlaylist = (track: Track) => {
    setPlaylistTracks((prev) => [...prev, track]);
  };

  const removeFromPlaylist = (track: Track) => {
    setPlaylistTracks((prev) => prev.filter((t) => t.rank !== track.rank));
  };

  useEffect(() => {
    fetch(
      "https://billboard-api2.p.rapidapi.com/hot-100?date=2019-05-11&range=1-10",
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
          "x-rapidapi-host": "billboard-api2.p.rapidapi.com",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setTracks(Object.values(data.content));
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Information title="Loading..." />;
  }

  if (error) {
    return <Information title={`Error: ${error}`} />;
  }

  return (
    <div className="bg-violet-700 w-full h-screen flex flex-col items-center gap-10 overflow-hidden">
      <NavBar />
      <SearchBar
        searchValue={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="flex flex-row gap-4 h-full">
        <ResultsList tracks={filteredTracks} onClick={addToPlaylist} />
        <PlayList
          tracks={playlistTracks || []}
          onClick={removeFromPlaylist}
          sendPlaylist={async () => {
            setIsLoading(true);
            setPlayListName("");
            setPlaylistTracks([]);
            alert(await fakeEndpoint(playListName, playlistTracks));
            setIsLoading(false);
          }}
          inputValue={playListName}
          onInputChange={(e) => setPlayListName(e.target.value)}
        />
      </div>
    </div>
  );
}

const Information = ({ title }: { title: string }) => {
  return (
    <div className="bg-violet-700 w-full h-screen flex items-center justify-center text-white text-3xl">
      {title}
    </div>
  );
};

export default App;
