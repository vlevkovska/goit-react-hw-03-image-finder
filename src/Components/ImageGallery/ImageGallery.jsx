import style from "./ImageGallery.module.css";

import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
function ImageGallery({ imgArr, onOpen }) {
  return (
    <ul className={style.ImageGallery}>
      {imgArr.map((imgArr) => (
        <ImageGalleryItem key={imgArr.id} imgArr={imgArr} onOpen={onOpen} />
      ))}
    </ul>
  );
}

export default ImageGallery;
