import style from "./ImageGalleryItem.module.css";

function ImageGalleryItem({ imgArr, onOpen }) {
  const { webformatURL, tags, largeImageURL } = imgArr;
  return (
    <li className={style.ImageGalleryItem}>
      <img
        onClick={onOpen}
        data-source={largeImageURL}
        src={webformatURL}
        alt={tags}
        className={style.ImageGalleryItemImage}
      />
    </li>
  );
}

export default ImageGalleryItem;
