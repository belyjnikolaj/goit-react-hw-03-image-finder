import React, { Component } from "react";
import css from './ImageGalleryItem.module.css';
import Modal from "components/modal/Modal";

class ImageGalleryItem extends Component {
    state = { 
        showModal: false,
    } 
    toggleModal = () => {
        this.setState(({showModal}) => ({
            showModal: !showModal
        }))
    }

    render() { 
        const { id, imageUrl, alt, largeImageURL } = this.props;
        const {showModal} = this.state
        return (
        <li className={css['gallery-item']} key={id}>
            <img
                className={css['gallery-item__image']}
                src={imageUrl}
                    alt={alt}
                    onClick={this.toggleModal}
            />
            {showModal && <Modal onClose={this.toggleModal} largeImageURL={largeImageURL} alt={alt}>
                <img src={largeImageURL} alt={alt} />                     
            </Modal>}                
        </li>
    );
    }
} 

export default ImageGalleryItem;
