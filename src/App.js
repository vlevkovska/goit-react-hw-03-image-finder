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
    searchImg: null,
    page: 1,
    imgArr: [],
    largeImageURL: "",
    isModalOpen: false,
    error: null,
    status: Status.IDLE,
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
      this.FetchImages(nextName, nextPage);
    }
  }

  getData = (data) => {
    return data.map(({ id, tags, webformatURL, largeImageURL }) => {
      return {
        id: id,
        webformatURL: webformatURL,
        tags: tags,
        largeImageURL: largeImageURL,
      };
    });
  };

  FetchImages = (nextName, nextPage) => {
    imagesApi
      .FetchImages(nextName, nextPage)
      .then(({ hits }) => {
        const data = this.getData(hits);
        this.setState({ imgArr: data, status: "resolved" });

        if (!hits.length) {
          alert("No such pictures, try again");
          this.setState({
            error: "Something went wrong, please. try again",
            status: "rejected",
          });
        } else this.setState({ error: null });
      })
      .catch((error) => this.setState({ error, status: Status.REJECTED }));
  };

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

  handleLoadeMore = (searchImg, page) => {
    imagesApi
      .FetchImages(searchImg, page)
      .then(({ hits }) => {
        const data = this.getData(hits);
        this.setState((prev) => ({
          imgArr: [...prev.imgArr, ...data],
          status: "resolved",
        }));
        this.scroll();
      })
      .catch((error) => this.setState({ error, status: "reject" }));
  };

  scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  hendelOpenModal = (img) => {
    this.setState({
      isModalOpen: true,
      modalImg: img,
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
