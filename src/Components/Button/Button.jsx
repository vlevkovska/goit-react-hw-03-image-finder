import PropTypes from "prop-types";
import style from "./Button.module.css";

export default function Button({ onClick }) {
  return (
    <button type="button" className={style.Button} onClick={onClick}>
      Load More
    </button>
  );
}
Button.propTypes = {
  onClick: PropTypes.func,
};

// import style from "./Button.module.css";

// function Button({ onClick }) {
//   return (
//     <button onClick={onClick} className={style.Button}>
//       Load More
//     </button>
//   );
// }

// export default Button;
