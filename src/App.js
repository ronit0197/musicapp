import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./scss/App.scss"
import Home from './Pages/Home';
import SiteNavbar from './Components/SiteNavbar'
import Player from './Components/Player';
import React, { useContext, useState } from 'react';
import { MediaContext } from './Context/MediaContext';

function App() {

  const { songs, currentSongIndex } = useContext(MediaContext);

  // Get the current song
  const currentSong = songs[currentSongIndex];

  const [searchQuery, setSearchQuery] = useState('');

  console.log("Songs:", songs)
  console.log("Current song", currentSongIndex)

  return (
    <BrowserRouter>
      <SiteNavbar setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path='/' element={<Home searchQuery={searchQuery} />} />
      </Routes>
      {
        currentSong &&
        <Player currentSong={currentSong.Src} currentSongName={currentSong.SongName} currentAirtist={currentSong.Singer} currentAlbum={currentSong.Album} />
      }
    </BrowserRouter>
  );
}

export default App;
