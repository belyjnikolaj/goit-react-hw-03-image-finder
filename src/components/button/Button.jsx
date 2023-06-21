import { Component } from "react";
import css from './Button.module.css';

class Button extends Component {
    state = {  } 
    render() { 
        const { handlePageChange } = this.props;
        return (
            <button
                type="button"
                className={css.button}
                onClick={handlePageChange}
            >
                Load more
            </button>
        );
    }
}
 
export default Button;
