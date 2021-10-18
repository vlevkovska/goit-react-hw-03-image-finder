import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Searchbar from "./Components/SearchBar/SearchBar";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import Button from "./Components/Button/Button";
import Loader from "./Components/Loader/Loader";
import Modal from "./Components/Modal/Modal";
import imagesApi from "./Services/API";

const Status = {
  IDLE: "idle", // стоїть на місці
  PENDING: "pending", // очікується
  RESOLVED: "resolved", // виконалось
  REJECTED: "rejected", // відхилено
};

class App extends Component {
  state = {
    searchImg: "",
    page: 1,
    img: [],
    loading: false,
    // currentPage: null,
    modalImg: "",
    isModalOpen: false,
    error: null,
    status: Status.IDLE,
    webformatURL: "",
    id: "",
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.searchImg;
    const nextName = this.state.searchImg;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    if (prevName !== nextName) {
      this.setState({ img: [], page: 1, status: Status.PENDING });
    }
    if (prevName !== nextName || prevPage !== nextPage) {
      this.fetchImages(nextName, nextPage);
    }
  }
  // if (
  //   prevState.currentPage !== this.state.currentPage ||
  //   !this.state.img.length
  // ) {
  fetchImages(nextName, nextPage) {
    imagesApi
      .fetchImages(nextName, nextPage)
      .then((img) => {
        this.setState((prevState) => {
          return {
            img: [...prevState.img, ...img.hits],
            status: Status.RESOLVED,
          };
        });
        if (nextPage !== 1) {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        }
        if (img.total === 0) {
          return Promise.reject(new Error("Incorrect input"));
        }
      })
      .catch((error) => this.setState({ error, status: Status.REJECTED }));
    // .finally(() => this.setState({ loading: false }));
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
      page: 1,
      img: [],
    });
  };

  handleLoadeMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
      // loading: true,
    }));
  };

  hendelOpenModal = (e) => {
    this.setState(
      {
        modalImg: e.target.dataset.source,
      },
      () => {
        this.toggleModal();
      }
    );
    // isModalOpen: true,
    // modalImg: e.target.dataset.source,
  };
  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    }));
  };
  hendelCloseModal = () => {
    this.setState({ isModalOpen: false, modalImg: "" });
  };

  render() {
    const { img, error, status, isModalOpen, modalImg } = this.state;
    const resolvedImg = status === Status.RESOLVED && img.length > 11;
    // loading, currentPage,
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        {status === Status.IDLE && (
          <h2 className="invitation">Use Search above!</h2>
        )}
        {status === Status.REJECTED && <h1>{error.message}</h1>}
        <ToastContainer autoClose={3000} />

        {resolvedImg && (
          <ImageGallery imgArr={img} onOpen={this.hendelOpenModal} />
        )}
        {status === Status.PENDING && <Loader />}
        {img.length !== 0 && <Button onClick={this.handleLoadeMore} />}
        {isModalOpen && (
          <Modal modalClose={this.hendelCloseModal} largeImageURL={modalImg} />
        )}
        {/* {isModalOpen && (
          <Modal modalImg={modalImg} modalClose={this.hendelCloseModal} />
        )}
        {loading && <Loader />}
        {currentPage && <Button onClick={this.handleLoadeMore} />} */}
      </>
    );
  }
}

export default App;
