import { Component } from "react";
import PropTypes from "prop-types";
import style from "./Modal.module.css";

class Modal extends Component {
  static propTypes = {
    modalClose: PropTypes.func.isRequired,
    modalImg: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener("keydown", this.closeModalByESC);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.closeModalByESC);
  }

  closeModalByESC = (e) => {
    if (e.key !== "Escape") {
      return;
    }
    this.props.modalClose();
  };

  render() {
    const { modalImg, modalClose } = this.props;

    return (
      <div onClick={modalClose} className={style.Overlay}>
        <div className={style.Modal}>
          <img src={modalImg} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
