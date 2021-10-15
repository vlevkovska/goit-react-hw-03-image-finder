import ReactLoaderSpinner from "react-loader-spinner";

function Loader() {
  return (
    <ReactLoaderSpinner
      type="Hearts"
      color="#85309f"
      height={80}
      width={80}
      timeout={3000} //3 secs
      style={{
        position: "fixed",
        top: "50%",
        left: "47%",
      }}
    />
  );
}

export default Loader;
