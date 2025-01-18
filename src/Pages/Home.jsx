import React, { useContext, useState, useEffect } from "react";
import { MediaContext } from "../Context/MediaContext";
import SongCard from "../Components/SongCard";
import { Container, Button } from "react-bootstrap";
import * as icons from "react-bootstrap-icons";
import Skeleton from "react-loading-skeleton"; // Import Skeleton loader
import "react-loading-skeleton/dist/skeleton.css"; // Skeleton styles

const Home = ({ searchQuery }) => {
    const { songs, generations, isLoading } = useContext(MediaContext);

    const [visibleCounts, setVisibleCounts] = useState(() => {
        try {
            const savedCounts = localStorage.getItem("visibleCounts");
            if (savedCounts) {
                return JSON.parse(savedCounts);
            }
            return generations.reduce((acc, gen) => ({ ...acc, [gen]: 24 }), {});
        } catch (error) {
            console.error("Error reading from localStorage:", error);
            return generations.reduce((acc, gen) => ({ ...acc, [gen]: 24 }), {});
        }
    });

    const globalSongs = songs.map((song, globalIndex) => ({
        ...song,
        globalIndex,
    }));

    const filteredSongs = globalSongs.filter((song) => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        return (
            song.SongName.toLowerCase().includes(lowerCaseQuery) ||
            song.Singer.toLowerCase().includes(lowerCaseQuery) ||
            song.Director.toLowerCase().includes(lowerCaseQuery)
        );
    });

    const filteredGenerations = generations.filter((generation) =>
        filteredSongs.some((song) => song.Generation === generation)
    );

    const loadMoreSongs = (generation) => {
        setVisibleCounts((prevCounts) => {
            const updatedCounts = { ...prevCounts, [generation]: prevCounts[generation] + 24 };
            localStorage.setItem("visibleCounts", JSON.stringify(updatedCounts));
            return updatedCounts;
        });
    };

    useEffect(() => {
        setVisibleCounts((prevCounts) => {
            const updatedCounts = generations.reduce((acc, gen) => {
                acc[gen] = prevCounts[gen] || 24;
                return acc;
            }, {});
            localStorage.setItem("visibleCounts", JSON.stringify(updatedCounts));
            return updatedCounts;
        });
    }, [generations]);

    return (
        <div>
            <Container className="home-container mt-3">
                {isLoading ? (
                    // Skeleton Loader while loading
                    <div>
                        <Skeleton width={200} height={30} count={3} className="mb-4" />
                        <div className="row">
                            {Array.from({ length: 12 }).map((_, index) => (
                                <div key={index} className="col-lg-2 col-md-3 col-4 mb-3">
                                    <Skeleton height={200} />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    filteredGenerations.map((generation) => {
                        const generationSongs = filteredSongs.filter(
                            (song) => song.Generation === generation
                        );

                        return (
                            <div key={generation} className="generation-section">
                                <div className="row p-3">
                                    <div className="col-lg-2 col-md-3 col-4">
                                        <span className="fw-bold text-primary-emphasis generation-names">
                                            {generation} Hit songs
                                        </span>
                                    </div>
                                    <div className="col-lg-10 col-md-9 col-8 d-flex align-items-center">
                                        <div className="p-1 w-100 bg-body-tertiary rounded"></div>
                                    </div>
                                </div>
                                <div className="row my-4 pb-lg-5 pb-md-4 pb-4">
                                    {generationSongs
                                        .slice(0, visibleCounts[generation] || 24)
                                        .map((song) => (
                                            <div
                                                className="col-lg-2 col-md-3 col-4 mb-3"
                                                key={song.globalIndex}
                                            >
                                                <SongCard
                                                    SongName={song.SongName}
                                                    Album={song.Album}
                                                    Singer={song.Singer}
                                                    index={song.globalIndex}
                                                />
                                            </div>
                                        ))}
                                </div>
                                {generationSongs.length === 0 && (
                                    <p className="text-center mt-5 text-body-tertiary fw-bold">
                                        No songs found in "{generation}" matching "{searchQuery}"
                                    </p>
                                )}
                                {generationSongs.length > (visibleCounts[generation] || 24) && (
                                    <div className="text-center mb-lg-4 pb-lg-4">
                                        <Button
                                            className="load-more-button"
                                            variant="primary"
                                            onClick={() => loadMoreSongs(generation)}
                                        >
                                            Show more <icons.ChevronDoubleDown className="ms-2" />
                                        </Button>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
                {!isLoading && filteredGenerations.length === 0 && (
                    <p className="text-center mt-5 text-body-tertiary fw-bold">
                        No results found for "{searchQuery}"
                    </p>
                )}
            </Container>
        </div>
    );
};

export default Home;