import { useRef, useState } from 'react';
import { processVideo } from '../endpoints/api'; // Adjust the path based on where you place api.js

import { FaStopCircle , FaPlayCircle , } from "react-icons/fa";

const VideoFeed = () => {
  const videoRef = useRef(null);
  const [videoSource, setVideoSource] = useState('camera');
  const [emotions, setEmotions] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const setupCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    videoRef.current.play();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const emotions = await processVideo(file);
        setEmotions(emotions);
      } catch (error) {
        console.error('Error processing video:', error);
      }
    }
  };

  const handleVideoFeed  =  () => {
    // Handle video feed logic here
    // For example, you can use videoRef.current to access the video element
    setIsPlaying(() => !isPlaying);


  }

  return (
    <div className="flex flex-col items-center mt-12 space-y-4">
      <div className="flex justify-center gap-2 md:gap-4 mb-4  bg-gray-200 p-4">
        <button
          onClick={() => { setVideoSource('camera'); setupCamera(); }}
          className={`px-4 py-2 font-bold rounded-full text-sm md:text-base ${videoSource === 'camera' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-black'}`}
        >
          Use Camera
        </button>
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="hidden"
          id="upload-video"
        />
        <label
          htmlFor="upload-video"
          className={`px-4 py-2 font-bold rounded-full text-center justify-center text-sm md:text-base bg-red-500 ${videoSource === 'upload' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-black'}`}
        >
          Upload Video
        </label>
        <div className='flex gap-4 align-center justify-center items-center bg-gray-700 px-4 py-2 text-xl md:text-base rounded-full  text-white ' onClick = {handleVideoFeed}>{isPlaying ? (<button className='flex justify-center gap-1 items-center '><span>Stop analysing</span><FaStopCircle/ ></button>): (<button className='flex align-center items-center gap-1'><span>Start Analyzing</span><FaPlayCircle /></button>)}</div>
      </div>
      <div className="relative items-center  mx-2 bg-black">
        <video ref={videoRef} className="hidden" />
        <canvas width="800" height="480" className="border-2 border-blue-600   max-w-full   w-full" />
      </div>
      <div>
        {emotions.map((emotion, index) => (
          <div key={index} className="text-center mt-4">
            {emotion.name}: {emotion.emotion}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoFeed;
