import React, { createContext, useState, useEffect } from "react";
import data from "../Data/Data.json";

// Create the context
export const MediaContext = createContext();

// Create a provider component
export const MediaProvider = ({ children }) => {
    const [songs, setSongs] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(0); // Track the current song index
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // Load the data from Data.json
        setSongs(data);
    }, []);

    // Function to go to the next song
    const nextSong = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length); // Loop back to first song
    };

    // Function to go to the previous song
    const previousSong = () => {
        setCurrentSongIndex(
            (prevIndex) => (prevIndex - 1 + songs.length) % songs.length // Loop back to last song
        );
    };

    return (
        <MediaContext.Provider value={{ songs, currentSongIndex, nextSong, previousSong, setCurrentSongIndex, isPlaying, setIsPlaying }}>
            {children}
        </MediaContext.Provider>
    );
};