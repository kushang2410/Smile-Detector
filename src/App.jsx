import React, { useState, useEffect } from 'react';
import SmileCapture from './components/SmileCapture';
import SmilePosts from './components/SmilePosts';
import { toast } from 'react-toastify';

function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem('smiles')) || [];
    setImages(storedImages);
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      localStorage.setItem('smiles', JSON.stringify(images));
    }
  }, [images]);

  const addImage = (image, isPerfectSmile, isAngry) => {
    if (isAngry) {
      toast('Don\'t be angry, keep smiling!');
      return;
    }

    setImages((prevImages) => {
      const updatedImages = [...prevImages, { image, isPerfectSmile, isAngry }];
      return updatedImages;
    });
    toast(isPerfectSmile ? 'Great smile! Tokens awarded!' : 'Smile detected, but not perfect. Retake the photo!');
  };

  const deleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    localStorage.setItem('smiles', JSON.stringify(updatedImages));
    toast('Image deleted!');
  };

  return (
    <div className="container text-center mt-4">
      <h1 className="my-3">Capture a Good Smile! 🤗</h1>
      <SmileCapture addImage={addImage} />
      <SmilePosts images={images} deleteImage={deleteImage} />
    </div>
  );
}

export default App;