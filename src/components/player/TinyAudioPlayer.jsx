import React, { useState, useRef, useEffect } from 'react';

const TinyAudioPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const progressPercent = (currentTime / duration) * 100;
      setProgress(progressPercent);
    }
  };

  useEffect(() => {
    const audioNode = audioRef.current;
    audioNode.addEventListener('timeupdate', handleTimeUpdate);
    audioNode.addEventListener('durationchange', () => setDuration(audioNode.duration));
    audioNode.addEventListener('play', handlePlay);
    audioNode.addEventListener('pause', handlePause);
    audioNode.addEventListener('ended', handlePause);
    return () => {
      audioNode.removeEventListener('timeupdate', handleTimeUpdate);
      audioNode.removeEventListener('durationchange', () => setDuration(audioNode.duration));
      audioNode.removeEventListener('play', handlePlay);
      audioNode.removeEventListener('pause', handlePause);
      audioNode.removeEventListener('ended', handlePause);
    };
  }, [duration]);

  const handleSeek = (e) => {
    const seekTime = (e.nativeEvent.offsetX / e.currentTarget.clientWidth) * duration;
    audioRef.current.currentTime = seekTime;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="tiny-audio-player">
      <audio
        ref={audioRef}
        src={src}
      ></audio>
      <div className="player-controls">
        <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
        <div className="progress-bar" onClick={handleSeek}>
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="timer">
          {formatTime(audioRef.current?.currentTime || 0)} / {formatTime(duration)}
        </span>
      </div>
    </div>
  );
};

export default TinyAudioPlayer;
