import styles from "./header.module.css";
const Header = () => {
  return (
    <div className={styles.header}>
      <h1>Weather Forecast App</h1>
      <p>Get the latest weather forecast for any city in india</p>
    </div>
  );
};
export default Header;
