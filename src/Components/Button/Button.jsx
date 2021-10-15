import style from "./Button.module.css";

function Button({ onClick }) {
  return (
    <button onClick={onClick} className={style.Button}>
      Load More
    </button>
  );
}

export default Button;
