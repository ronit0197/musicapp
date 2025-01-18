import React, { createContext, useState, useEffect } from "react";
import { db } from "../Firebase/Config";
import { collection, getDocs } from "firebase/firestore";

// Create the context
export const MediaContext = createContext();

// Create a provider component
export const MediaProvider = ({ children }) => {
    const [songs, setSongs] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(0); // Track the current song index
    const [isPlaying, setIsPlaying] = useState(false);
    const [generations, setGenerations] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true); // Set loading to true before fetching data

                // Fetch data from Firestore
                const q = collection(db, "songs");
                const snapshot = await getDocs(q);

                if (snapshot.empty) {
                    throw new Error("No songs found");
                }

                const data = snapshot.docs.map((doc) => doc.data());

                // Set the fetched data
                setSongs(data);

                // Extract unique generations
                const uniqueGenerations = [...new Set(data.map((song) => song.Generation))];
                setGenerations(uniqueGenerations);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false); // Set loading to false after data fetching
            }
        };

        fetchData();
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
        <MediaContext.Provider
            value={{
                songs,
                generations,
                currentSongIndex,
                nextSong,
                previousSong,
                setCurrentSongIndex,
                isPlaying,
                setIsPlaying,
                isLoading,
            }}
        >
            {children}
        </MediaContext.Provider>
    );
};
