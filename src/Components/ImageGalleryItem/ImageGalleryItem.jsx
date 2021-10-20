import React from "react";
import PropTypes from "prop-types";

import style from "./ImageGalleryItem.module.css";

function ImageGalleryItem({ webformatURL, tags, largeImageURL }) {
  return (
    <li className={style.ImageGalleryItem}>
      <img
        // onClick={onOpen}
        data-source={largeImageURL}
        src={webformatURL}
        alt={tags}
        className={style.ImageGalleryItemImage}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  id: PropTypes.number,
  tags: PropTypes.string.isRequired,
  // onOpen: PropTypes.func,
  largeImageURL: PropTypes.string,
};

export default ImageGalleryItem;
