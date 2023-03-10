import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled'


export const ImageGalleryItem = ({ smallImage, tags, largeImage }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };


  return (
    <GalleryItem>
      <GalleryItemImage onClick={toggleModal} src={smallImage} alt={tags} />
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImage} alt={tags} />
        </Modal>
      )}
    </GalleryItem>
  );
}


ImageGalleryItem.propTypes = {
    smallImage: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
};