import PropTypes from 'prop-types';
import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled'

export class ImageGalleryItem extends Component {
    state = {
        showModal: false,
    }

    toggleModal = () => {
        this.setState(({ showModal }) => ({ showModal: !showModal }))
    }


    render(){
        const { smallImage, tags, largeImage } = this.props;

        return <GalleryItem>
        <GalleryItemImage onClick={this.toggleModal} src={smallImage} alt={tags} />
        {this.state.showModal && <Modal onClose={this.toggleModal}><img src={largeImage} alt={tags} /></Modal>}
    </GalleryItem>
    }

}

ImageGalleryItem.propTypes = {
    smallImage: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
};