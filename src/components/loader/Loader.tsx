import Raccoon from "../../Images/raccoon-loading.gif";
function Loader() {
  return (
    <>
      <div className="loading">
        <figure>
          <img alt="loading" width="400" height="400" src={Raccoon} />
          <figcaption>Загрузка...</figcaption>
        </figure>
      </div>
    </>
  );
}

export default Loader;
