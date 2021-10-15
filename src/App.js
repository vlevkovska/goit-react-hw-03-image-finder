import { Component } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Searchbar from "./Components/SearchBar/SearchBar";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import Button from "./Components/Button/Button";
import Loader from "./Components/Loader/Loader";
import Modal from "./Components/Modal/Modal";
import fetchImages from "./Services/API";

class App extends Component {
  state = {
    searchImg: "",
    img: [],
    loading: false,
    currentPage: null,
    modalImg: "",
    isModalOpen: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.currentPage !== this.state.currentPage ||
      !this.state.img.length
    ) {
      fetchImages(this.state.searchImg, this.state.currentPage)
        .then((img) => {
          this.setState((prevState) => {
            return { img: [...prevState.img, ...img.hits] };
          });
          if (this.state.currentPage !== 1) {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: "smooth",
            });
          }
        })
        .catch((error) => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { value } = event.target[1];
    if (value.trim() === "") {
      return toast.error("Enter name of picture you are looking for!");
    }

    this.setState({
      searchImg: value.toLowerCase(),
      loading: true,
      currentPage: 1,
      img: [],
    });
  };

  handleLoadeMore = () => {
    this.setState(({ currentPage }) => ({
      currentPage: currentPage + 1,
      loading: true,
    }));
  };

  hendelOpenModal = (e) => {
    this.setState({
      isModalOpen: true,
      modalImg: e.target.dataset.source,
    });
  };

  hendelCloseModal = () => {
    this.setState({ isModalOpen: false, modalImg: "" });
  };

  render() {
    const { img, loading, currentPage, isModalOpen, modalImg } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <ToastContainer autoClose={3000} />

        {img && <ImageGallery imgArr={img} onOpen={this.hendelOpenModal} />}
        {isModalOpen && (
          <Modal modalImg={modalImg} modalClose={this.hendelCloseModal} />
        )}
        {loading && <Loader />}
        {currentPage && <Button onClick={this.handleLoadeMore} />}
      </>
    );
  }
}

export default App;
