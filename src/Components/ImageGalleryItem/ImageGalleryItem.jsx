import React from "react";
import PropTypes from "prop-types";

import style from "./ImageGalleryItem.module.css";

function ImageGalleryItem({ webformatURL, tags, largeImageURL, onOpen }) {
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

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  tags: PropTypes.string.isRequired,
  onOpen: PropTypes.func,
  modalImg: PropTypes.string,
};
