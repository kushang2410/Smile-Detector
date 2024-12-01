import React from 'react';

const SmilePosts = ({ images, deleteImage }) => {
  if (images.length === 0) return <p className="my-3">No smiles captured yet!</p>;

  return (
    <div className="row">
      {images.map((imageObj, index) => (
        <div className="col-12 col-sm-6 col-lg-4" key={index}>
          <div className="card my-4">
            <div className="card-img">
              <img src={imageObj.image} className="img" alt="Smile" />
            </div>
            <div className="card-title">Smile Capture</div>
            <div className="card-subtitle">
              {imageObj.isAngry
                ? "Don't frown, sunshine! Your smile makes the world brighter. 🌞✨"
                : imageObj.isPerfectSmile
                  ? "What a dazzling smile! You’ve earned extra charm points. 😉💖"
                  : "Almost perfect! That smile is too cute not to try again. 😘📸"}
            </div>
            <hr className="card-divider" />
            <div className="card-footer">
              <button className="card-btn" onClick={() => deleteImage(index)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SmilePosts;
