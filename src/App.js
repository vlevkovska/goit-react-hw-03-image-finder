import { Component } from "react";

import Searchbar from "./Components/SearchBar/SearchBar";
// import ImageGallery from "./components/ImageGallery";
// import Button from "./components/Button";
// import Loader from "./components/Loader";
// import Modal from "./components/Modal";
// import api from "./services/pixabayAPI";

class App extends Component {
  state = {
    searchImg: "",
    img: [],
    loading: false,
    currentPage: null,
    modalImg: "",
    isModalOpen: false,
  };

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     prevState.currentPage !== this.state.currentPage ||
  //     !this.state.img.length
  //   ) {
  //     api(this.state.searchImg, this.state.currentPage)
  //       .then((img) => {
  //         this.setState((prevState) => {
  //           return { img: [...prevState.img, ...img.hits] };
  //         });
  //         if (this.state.currentPage !== 1) {
  //           window.scrollTo({
  //             top: document.documentElement.scrollHeight,
  //             behavior: "smooth",
  //           });
  //         }
  //       })
  //       .catch((error) => this.setState({ error }))
  //       .finally(() => this.setState({ loading: false }));
  //   }
  // }

  handleSubmit = (event) => {
    event.preventDefault();
    const { value } = event.target[1];

    if (value.trim() === "") {
      alert("Введите искомую картинку.");
      return;
    }

    this.setState({
      searchImg: value.toLowerCase(),
      loading: true,
      currentPage: 1,
      img: [],
    });
  };

  // handleLoadeMore = () => {
  //   this.setState(({ currentPage }) => ({
  //     currentPage: currentPage + 1,
  //     loading: true,
  //   }));
  // };

  // hendelOpenModal = (e) => {
  //   this.setState({
  //     isModalOpen: true,
  //     modalImg: e.target.dataset.source,
  //   });
  // };

  // hendelCloseModal = () => {
  //   this.setState({ isModalOpen: false, modalImg: "" });
  // };

  render() {
    const { img, loading, currentPage, isModalOpen, modalImg } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />

        {/* {img && <ImageGallery imgArr={img} onOpen={this.hendelOpenModal} />}
        {isModalOpen && (
          <Modal modalImg={modalImg} modalClose={this.hendelCloseModal} />
        )}
        {loading && <Loader />}
        {currentPage && <Button onClick={this.handleLoadeMore} />} */}
      </>
    );
  }
}

export default App;
