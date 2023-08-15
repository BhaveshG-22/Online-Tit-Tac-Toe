import ClipLoader from "react-spinners/ClipLoader";

export const Loader = () => {
  return (
    <div className="sweet-loading">
      <ClipLoader
        color="#808080"
        size={75}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};
