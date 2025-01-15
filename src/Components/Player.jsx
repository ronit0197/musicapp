import React, { useContext, useEffect, useRef, useState } from 'react'
import { Container } from 'react-bootstrap'
import Image from 'react-bootstrap/Image';
import * as icons from 'react-bootstrap-icons';
import { MediaContext } from '../Context/MediaContext';

const Player = ({ currentSong, currentAlbum, currentAirtist, currentSongName }) => {

    const { nextSong, previousSong, currentSongIndex, isPlaying, setIsPlaying } = useContext(MediaContext);

    const [soundShow, setSoundShow] = useState(false)
    
    const [currentTime, setCurrentTime] = useState("00:00");
    const [duration, setDuration] = useState("00:00");
    const [volume, setVolume] = useState(1);
    const audioRef = useRef(null);

    function soundToggle() {
        setSoundShow((prevState) => !prevState);
    }

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    const handleTimeUpdate = () => {
        const audio = audioRef.current;
        setCurrentTime(formatTime(audio.currentTime));
        if(formatTime(audio.currentTime) === duration){
            nextSong()
        }
    };

    const handleLoadedMetadata = () => {
        const audio = audioRef.current;
        setDuration(formatTime(audio.duration));
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value / 100; // Convert to a range between 0 and 1
        setVolume(newVolume);
        audioRef.current.volume = newVolume;
    };

    useEffect(() => {
        if (audioRef.current && isPlaying) {
            audioRef.current.play();
        }
    }, [currentSongIndex, isPlaying]);

    return (
        <Container className='player' fluid>
            <div className="row h-100">
                <div className="col-lg-3 col-md-3 col-7">
                    <div className="player-details h-100 ps-lg-4 ps-md-0 ps-0">
                        <div className='d-flex align-items-center'>
                            <Image className={`player-album ${isPlaying ? 'rotate-album' : ''}`} src={currentAlbum} roundedCircle />
                        </div>
                        <div className='ms-3 d-flex align-items-center'>
                            <div>
                                <p className='text-white m-0 mb-2'>{currentSongName}</p>
                                <p className='text-white m-0'>{currentAirtist}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-md-3 col-5">
                    <div className="player-controls h-100 ps-lg-5 ps-md-4 ps-3">
                        <icons.SkipStartFill onClick={previousSong} color='white' className='previous' />
                        {isPlaying ? (
                            <icons.PauseCircleFill
                                color='white'
                                className='play mx-lg-4 mx-md-3 mx-3'
                                onClick={togglePlayPause}
                            />
                        ) : (
                            <icons.PlayCircleFill
                                color='white'
                                className='play mx-lg-4 mx-md-3 mx-3'
                                onClick={togglePlayPause}
                            />
                        )}
                        <icons.SkipEndFill onClick={nextSong} color='white' className='next' />
                    </div>
                </div>
                <div className="col-lg-4 col-md-3 col-6 player-time-control">
                    <div className="d-flex align-items-center justify-content-center h-100">
                        <span className='text-light player-timing'>{currentTime}</span>
                        <input
                            className='w-75 mx-3 player-slider'
                            type="range"
                            min={0}
                            max={audioRef.current?.duration || 100}
                            value={audioRef.current?.currentTime || 0}
                            onChange={(e) => {
                                const audio = audioRef.current;
                                audio.currentTime = e.target.value;
                            }}
                        />
                        <span className='text-light player-timing'>{duration}</span>
                    </div>
                </div>
                <div className="col-lg-3 col-md-3 col-6 player-sound-control">
                    <div className="d-flex align-items-center justify-content-end h-100 ps-lg-5 ps-md-4 ps-3">
                        <icons.SpeakerFill onClick={soundToggle} className='me-4 sound-icon' color='white' />
                    </div>
                    <div className={`sound-range ${soundShow ? "sound-range-show" : ""}`}>
                        <input
                            className='sound-input'
                            type="range"
                            min={0}
                            max={100}
                            value={volume * 100} // Convert volume to percentage
                            onChange={handleVolumeChange}
                        />
                    </div>
                </div>
            </div>

            {/* Audio element */}
            <audio
                ref={audioRef}
                src={currentSong}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
            />
        </Container>
    )
}

export default Player