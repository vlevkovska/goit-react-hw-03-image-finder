import { Component } from "react";
import style from "./SearchBar.module.css";

class Searchbar extends Component {
  state = { inputValue: "" };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value.toLowerCase() });
  };

  render() {
    return (
      <header className={style.Searchbar}>
        <form onSubmit={this.props.onSubmit} className={style.SearchForm}>
          <button type="submit" className={style.SearchFormButton}>
            <span className={style.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            name="inputValue"
            onChange={this.handleChange}
            className={style.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
