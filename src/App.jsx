import React, { useState, useEffect } from 'react';
import SmileCapture from './components/SmileCapture';
import SmilePosts from './components/SmilePosts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const storedImages = JSON.parse(localStorage.getItem('smiles')) || [];
    setImages(storedImages);
  }, []);

  useEffect(() => {
    localStorage.setItem('smiles', JSON.stringify(images));
  }, [images]);

  const addImage = (image, isPerfectSmile, isAngry) => {
    if (isAngry) {
      return;
    }

    setImages((prevImages) => {
      const updatedImages = [...prevImages, { image, isPerfectSmile, isAngry }];
      return updatedImages;
    });
  };

  const deleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    toast.info('Image deleted!');
  };

  return (
    <div className="container text-center mt-4">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        style={{ width: "auto" }}
      />
      <h1 className="my-3">Capture a Good Smile! 🤗</h1>
      <SmileCapture addImage={addImage} />
      <SmilePosts images={images} deleteImage={deleteImage} />
    </div>
  );
};

export default App;
