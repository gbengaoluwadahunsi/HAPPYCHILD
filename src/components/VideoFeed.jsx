// src/components/VideoFeed.jsx
import  { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as blazeface from '@tensorflow-models/blazeface';
import { pipeline } from '@xenova/transformers';

const VideoFeed = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [emotions, setEmotions] = useState([]);
  const [videoSource, setVideoSource] = useState('camera');
  const [emotionClassifier, setEmotionClassifier] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const classifier = await pipeline('text-classification', 'path/to/your/model');
      setEmotionClassifier(classifier);
    };

    loadModel();

    if (videoSource === 'camera') {
      setupCamera();
    }
  }, [videoSource]);

  const setupCamera = async () => {
    if (videoRef.current) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      detectFaces();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file && videoRef.current) {
      const url = URL.createObjectURL(file);
      videoRef.current.src = url;
      videoRef.current.play();
      detectFaces();
    }
  };

  const detectFaces = async () => {
    const model = await blazeface.load();
    setInterval(async () => {
      const returnTensors = false;
      const predictions = await model.estimateFaces(videoRef.current, returnTensors);

      if (predictions.length > 0) {
        const context = canvasRef.current?.getContext('2d');
        context?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        predictions.forEach(async (prediction) => {
          const start = prediction.topLeft;
          const end = prediction.bottomRight;
          const size = [end[0] - start[0], end[1] - start[1]];

          if (context) {
            context.beginPath();
            context.rect(start[0], start[1], size[0], size[1]);
            context.lineWidth = 2;
            context.strokeStyle = 'blue';
            context.stroke();

            const faceCanvas = document.createElement('canvas');
            faceCanvas.width = size[0];
            faceCanvas.height = size[1];
            const faceContext = faceCanvas.getContext('2d');
            faceContext.drawImage(
              videoRef.current,
              start[0],
              start[1],
              size[0],
              size[1],
              0,
              0,
              size[0],
              size[1]
            );

            if (emotionClassifier) {
              const imageData = faceContext.getImageData(0, 0, size[0], size[1]);
              const emotion = await emotionClassifier(imageData);
              context.fillStyle = 'red';
              context.fillText(emotion[0].label, start[0], start[1] - 10);

              const newEmotionData = {
                name: 'Student Name',
                date: new Date().toISOString(),
                emotion: emotion[0].label,
              };
              setEmotions((prevEmotions) => [...prevEmotions, newEmotionData]);
            }
          }
        });
      }
    }, 100);
  };

  const handleSaveData = () => {
    // Implement logic to save emotions data to CSV
  };

  return (
    <div className="flex flex-col items-center mt-12 space-y-4">
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => setVideoSource('camera')}
          className={`px-4 py-2 font-bold rounded ${videoSource === 'camera' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-black'}`}
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
          className={`px-4 py-2 font-bold rounded ${videoSource === 'upload' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-black'}`}
        >
          Upload Video
        </label>
      </div>
      <div className="relative">
        <video ref={videoRef} className="hidden" />
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          className="border-2 border-blue-600 w-full max-w-full sm:w-3/4 md:w-1/2 lg:w-1/3"
        />
      </div>
      <button
        onClick={handleSaveData}
        className="px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition"
      >
        Save Emotion Data
      </button>
    </div>
  );
};

export default VideoFeed;
