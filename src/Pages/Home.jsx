import React, { useContext } from 'react';
import { MediaContext } from '../Context/MediaContext';
import SongCard from '../Components/SongCard';
import { Container } from 'react-bootstrap';

const Home = ({ searchQuery }) => {

    const { songs } = useContext(MediaContext);

    // Filter songs based on the search query
    const filteredSongs = songs.filter((song) => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        return (
            song.SongName.toLowerCase().includes(lowerCaseQuery) ||
            song.Singer.toLowerCase().includes(lowerCaseQuery) ||
            song.Director.toLowerCase().includes(lowerCaseQuery)
        );
    });

    return (
        <div>
            <Container>
                <div className="row mt-3 mb-5 pb-5">
                    {filteredSongs.map((song, index) => (
                        <div className="col-lg-2 col-md-3 col-4 mb-3" key={index}>
                            <SongCard
                                SongName={song.SongName}
                                Album={song.Album}
                                Singer={song.Singer}
                                index={index}
                            />
                        </div>
                    ))}
                </div>
                {filteredSongs.length === 0 && (
                    <p className="text-center mt-5">No songs found matching "{searchQuery}"</p>
                )}
            </Container>
        </div>
    );
};

export default Home;