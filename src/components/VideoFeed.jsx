import { useRef, useState } from "react";
import {
  FaPlayCircle,
  FaStopCircle,
  FaFastBackward,
  FaFastForward,
  FaPauseCircle,
} from "react-icons/fa";
import { processVideo } from "../endpoints/api"; // Adjust the path based on where you place api.js
import video from "../assets/videos/happychild.mp4"

const VideoFeed = () => {
  const videoRef = useRef(null);

  const [videoSource, setVideoSource] = useState("default");
  const [emotions, setEmotions] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAnalysing, setIsAnalysing] = useState(false);

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
        console.error("Error processing video:", error);
      }
    }
  };

  const handleVideoFeed = () => {
    // Handle video feed logic here
    // For example, you can use videoRef.current to access the video element
    setIsAnalysing(() => !isAnalysing);
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleRewind = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(
        videoRef.current.currentTime - 10,
        0
      );
    }
  };

  const handleFastForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        videoRef.current.currentTime + 10,
        videoRef.current.duration
      );
    }
  };

  const handleStop = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <section className=" flex flex-col-reverse lg:flex-row  bg-blue-100  lg:gap-4 px-2 lg:px-8  py-12 lg:py-4 items-center  justify-center  lg:justify-between lg:mt-12 ">
      <div className="flex flex-col basis-3/4 ">
        

        <div className=" items-center lg:my-12 mx-2">
          {videoSource === "default" && (
            <video
              src={video}
              autoPlay
              controls
              // width="100%"
              // height="100%"
              ref={videoRef}
              className=" h-full border-4 border-blue-600 "
            />
          )}
          {videoSource === "upload" && (
            <video
              src="path/to/uploaded/video.mp4"
              autoPlay
              controls
              width="100%"
              height="100%"
              ref={videoRef}
              className="absolute"
            />
          )}
          {videoSource === "camera" && (
            <video
              src="path/to/camera/feed"
              autoPlay
              controls
              width="100%"
              height="100%"
              ref={videoRef}
            />
          )}
          <div className=" absolute  left-1/2 right-1/2 lg:relative lg:left-0 lg:right-0 flex gap-4 align-center justify-center items-center py-2  text-sm md:text-base rounded-full text-gray-700">
            <div
              className="flex gap-4 align-center justify-center items-center bg-gray-700 p-2 text-sm md:text-base rounded-full text-white"
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <button className="flex justify-center gap-1 items-center">
                  <FaPauseCircle />
                </button>
              ) : (
                <button className="flex align-center items-center gap-1">
                  <FaPlayCircle />
                </button>
              )}
            </div>
            <button
              className="flex align-center p-2  bg-gray-700  text-white items-center gap-1"
              onClick={handleRewind}
            >
              <FaFastBackward />
            </button>
            <button
              className="flex align-center p-2 items-center bg-gray-700  text-white gap-1"
              onClick={handleFastForward}
            >
              <FaFastForward />
            </button>
            <button
              className="flex align-center p-2 items-center bg-gray-700  text-white gap-1"
              onClick={handleStop}
            >
              <FaStopCircle />
            </button>
          </div>
        </div>
        <div>
          {emotions.map((emotion, index) => (
            <div key={index} className="text-center mt-4">
              {emotion.name}: {emotion.emotion}
            </div>
          ))}
        </div>
      </div>
      <div className="lg:w-3/4 items-center justify-center">
        <h2 className=" hidden lg:block lg:text-3xl font-extrabold lg:leading-relaxed ">A HappyChild, for a better future, in a better world...</h2>
        <div className="flex gap-2 md:gap-2 mb-4  justify-center py-4">
          <button
            onClick={() => {
              setVideoSource("camera");
              setupCamera();
            }}
            className={`px-4 py-2 font-bold rounded-full text-sm md:text-base bg-blue-700 text-white`}
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
            className={`px-4 py-2 font-bold rounded-full text-center justify-center text-sm md:text-base bg-red-500 ${
              videoSource === "upload"
                ? "bg-blue-700 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Upload Video
          </label>
          <div
            className="flex gap-4 align-center justify-center items-center bg-gray-700 px-4 py-2 text-sm md:text-base rounded-full  text-white "
            onClick={handleVideoFeed}
          >
            {isAnalysing ? (
              <button className="flex justify-center gap-1 items-center ">
                <span>Stop analysing</span>
                <FaStopCircle />
              </button>
            ) : (
              <button className="flex align-center items-center gap-1">
                <span>Start analysing</span>
                <FaPlayCircle />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoFeed;
