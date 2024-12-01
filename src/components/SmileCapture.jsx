import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { toast } from 'react-toastify';

const SmileCapture = ({ addImage }) => {
  const videoRef = useRef(null);
  const isModelLoaded = useRef(false);
  const streamRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api@latest/model/';
      try {
        await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
        isModelLoaded.current = true;
        console.log('Models loaded successfully');
      } catch (error) {
        toast.error('Error loading models. Please try again later.');
        console.error(error);
      }
    };
    loadModels();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      await videoRef.current.play();
      setIsCameraOn(true);
      console.log('Camera started successfully');
    } catch (error) {
      toast.error('Error accessing camera. Check permissions.');
      console.error(error);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setIsCameraOn(false);
    console.log('Camera stopped');
  };

  const captureSmile = async () => {
    if (!isModelLoaded.current) {
      toast.info('Model not loaded yet. Please wait.');
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);

    try {
      const detection = await faceapi.detectSingleFace(canvas).withFaceExpressions();
      if (detection) {
        const { happy, angry } = detection.expressions;

        if (angry > 0.8) {
          addImage(canvas.toDataURL(), false, true);
          stopCamera();
        } else if (happy > 0.8) {
          addImage(canvas.toDataURL(), true, false);
        } else {
          addImage(canvas.toDataURL(), false, false);
        }
      } else {
        toast.warning('No face detected. Try again.');
      }
    } catch (error) {
      toast.error('Error detecting face.');
      console.error(error);
    }
  };

  return (
    <div>
      <div className="video-container" style={{ width: '100%', height: 'auto', overflow: 'hidden' }}>
        <video ref={videoRef} className="video-card mb-3 border border-2 border-dark rounded-3 object-fit-cover"></video>
      </div>
      <button className="custom-button mx-3 mb-4" onClick={startCamera} disabled={isCameraOn}>
        <span>Start Camera</span>
      </button>
      <button className="custom-button mx-3 mb-4" onClick={stopCamera} disabled={!isCameraOn}>
        <span>Stop Camera</span>
      </button>
      <button className="custom-button mx-3 mb-4" onClick={captureSmile}>
        <span>Capture Smile</span>
      </button>
    </div>
  );
};

export default SmileCapture;
