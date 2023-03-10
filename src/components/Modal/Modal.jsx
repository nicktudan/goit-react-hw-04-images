import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from "react-dom";
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');


export class Modal extends Component {
    
    componentDidMount () {
        window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount () {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown = evt => {
        if(evt.code === 'Escape') {
            this.props.onClose();
        }
    }

    handleOverlayClick = evt => {
        if(evt.currentTarget === evt.target) {
            this.props.onClose();
        }
    }


    render() {
        return createPortal(
            <Overlay onClick={this.handleOverlayClick}>
                <ModalWindow>
                    {this.props.children}
                </ModalWindow>
            </Overlay>,
            modalRoot,
        )
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
};