import { Component } from "react";
import css from './Searchbar.module.css';
// import { BiSearchAlt2 } from "react-icons/bi";

class Searchbar extends Component {
    state = { 
        value:'', 
    } 

    handleChange = ({ target: { value } }) => {
        this.setState({ value });
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.handleSearch(this.state.value);
    }

    render() { 
        return (
            <header className={css.searchbar}>
                <form className={css.form} onSubmit={this.handleSubmit}>
                    <button type="submit" className={css.button}>
                        <div className={css["button-label"]}>
                            <div className={css.icon}></div>                         
                        </div>
                    </button>
                    <input
                        className={css.input}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.handleChange}
                        value={this.state.value}
                    />
                </form>
            </header>
        );
    }
}
 
export default Searchbar;

