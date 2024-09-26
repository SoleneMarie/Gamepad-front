import Header from "../Components/Header";
import Footer from "../Components/Footer";
import LeftMenu from "../Components/LeftMenu";
import wrong from "../pictures/wrong-way.jpg";

const WrongWay = () => {
  return (
    <>
      <Header />
      <main>
        <section className="all-menu">
          <LeftMenu />
        </section>
        <section className="content">
          <section className="not-found">
            <div id="wrong-way-img" className="no-game-found">
              <img src={wrong} />
              <p>Whoops, wrong way ...!</p>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
};
export default WrongWay;
