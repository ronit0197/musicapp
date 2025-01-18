import React, { useContext } from 'react'
import { Card, Image } from 'react-bootstrap';
import * as icons from 'react-bootstrap-icons';
import { MediaContext } from '../Context/MediaContext';

const SongCard = ({ SongName, Album, Singer, index }) => {

    const { currentSongIndex, setCurrentSongIndex, isPlaying, setIsPlaying } = useContext(MediaContext);

    const handlePlayClick = () => {
        setCurrentSongIndex(index); // Set the current song index
        setIsPlaying(true); // Set isPlaying to true
    };

    const truncateSingerName = (singerName) => {
        const parts = singerName.split(',');
        if (parts.length > 2) {
            return `${parts.slice(0, 2).join(', ')}.....`;
        }
        return singerName;
    };

    return (
        <Card className="song-card border-0 shadow">
            <Card.Img variant="top" src={Album} />
            <div className='card-overlay'>
                {
                    currentSongIndex === index && isPlaying ?
                        <div className='play-icon playing-icon'>
                            <Image className='w-50' src='/audio-wave.gif' roundedCircle />
                        </div>
                        :
                        <icons.PlayCircleFill onClick={handlePlayClick} className='play-icon' />
                }
            </div>
            <Card.Body>
                <Card.Title className='card-title'>{SongName}</Card.Title>
                <Card.Text>
                    <span className='card-desc'>{truncateSingerName(Singer)}</span>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default SongCard