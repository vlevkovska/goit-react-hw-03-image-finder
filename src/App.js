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
    imgArr: [],
    loading: false,
    // currentPage: null,
    largeImageURL: "",
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
      this.setState({ imgArr: [], page: 1, status: Status.PENDING });
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
      .then((imgArr) => {
        this.setState((prevState) => {
          return {
            imgArr: [...prevState.imgArr, ...imgArr.hits],
            status: Status.RESOLVED,
          };
        });
        if (nextPage !== 1) {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        }
        if (imgArr.total === 0) {
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
      imgArr: [],
    });
  };

  // handleLoadeMore = () => {
  //   this.setState(({ page }) => ({
  //     page: page + 1,
  //     // loading: true,
  //   }));
  // };

  // onOpen = (e) => {
  //   this.setState({ modalImg: e.target.dataset.source });
  //   this.toggleModal();
  // };
  // toggleModal = () => {
  //   this.setState(({ isModalOpen }) => ({
  //     isModalOpen: !isModalOpen,
  //   }));
  // };
  handleLoadeMore = () => {
    this.setState((currentPage) => ({
      page: currentPage.page + 1,
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
    const { imgArr, error, status, isModalOpen, modalImg } = this.state;
    const resolvedImg = status === Status.RESOLVED && imgArr.length > 11;
    // loading, currentPage,
    return (
      <>
        <ToastContainer autoClose={3000} />
        <Searchbar onSubmit={this.handleSubmit} />
        {status === Status.IDLE && (
          <h2 className="invitation">Use Search above!</h2>
        )}
        {status === Status.REJECTED && <h1>{error.message}</h1>}

        {resolvedImg && (
          <ImageGallery imgArr={imgArr} onOpen={this.hendelOpenModal} />
        )}
        {status === Status.PENDING && <Loader />}
        {imgArr.length !== 0 && <Button onClick={this.handleLoadeMore} />}
        {isModalOpen && (
          <Modal modalImg={modalImg} modalClose={this.hendelCloseModal} />
        )}
      </>
    );
  }
}

export default App;
