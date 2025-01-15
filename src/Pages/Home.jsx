import React, { useContext } from 'react'
import { MediaContext } from '../Context/MediaContext';
import SongCard from '../Components/SongCard';
import { Container } from 'react-bootstrap';

const Home = () => {

    const { songs } = useContext(MediaContext);

    return (
        <div>
            <Container>
                <div className="row mt-3 mb-5 pb-5">
                    {songs.map((song, index) => (
                        <div className="col-lg-2 col-md-3 col-4 mb-3">
                            <SongCard key={index} SongName={song.SongName} Album={song.Album} Singer={song.Singer} index={index} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home