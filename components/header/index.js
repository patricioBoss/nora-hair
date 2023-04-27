import SlideCart from "../SlideCart";
import Ad from "./Ad";
import Banner from "./Banner";
import Main from "./Main";
import styles from "./styles.module.scss";
import Top from "./Top";
export default function Header({ country, searchHandler }) {
  return (
    <> <SlideCart/>    
    <header className={styles.header}>
              <Banner/>
      <Top country={country} />
    </header>
     <Main searchHandler={searchHandler} />
    
    </>

  );
}
