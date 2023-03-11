import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from "react-dom";
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');


export const Modal = ({ onClose, children }) => {

  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        onClose();
      }
    };
    
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
  }, [onClose]);


  const handleOverlayClick = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };


  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <ModalWindow>{children}</ModalWindow>
    </Overlay>,
    modalRoot
  );
}


// export class Modal extends Component {
    
//     componentDidMount () {
//         window.addEventListener('keydown', this.handleKeyDown)
//     }

//     componentWillUnmount () {
//         window.removeEventListener('keydown', this.handleKeyDown)
//     }

//     handleKeyDown = evt => {
//         if(evt.code === 'Escape') {
//             this.props.onClose();
//         }
//     }

//     handleOverlayClick = evt => {
//         if(evt.currentTarget === evt.target) {
//             this.props.onClose();
//         }
//     }


//     render() {
//         return createPortal(
//             <Overlay onClick={this.handleOverlayClick}>
//                 <ModalWindow>
//                     {this.props.children}
//                 </ModalWindow>
//             </Overlay>,
//             modalRoot,
//         )
//     }
// }

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
};