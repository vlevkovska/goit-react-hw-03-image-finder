import React from "react";
import PropTypes from "prop-types";

import style from "./ImageGalleryItem.module.css";

function ImageGalleryItem({ webformatURL, tags, onOpen, largeImageURL }) {
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
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onOpen: PropTypes.func,
  largeImageURL: PropTypes.string.isRequired,
};
