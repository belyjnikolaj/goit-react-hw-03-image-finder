import { Component } from "react";
import css from './Modal.module.css';
import { createPortal } from "react-dom";
const modalRoot = document.querySelector('#modal-root');
class Modal extends Component {
    state = {} 
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }
     handleKeyDown = (e) => {
        if (e.code === 'Escape') this.props.onClose()
    }
    handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
            this.props.onClose();
        }
    }

    render() { 
        return createPortal(
            <div className={css.overlay} onClick={this.handleBackdropClick}>
                <div className={css.modal}>
                    {this.props.children}
                </div>
            </div>,
            modalRoot);
    }
}
 
export default Modal;