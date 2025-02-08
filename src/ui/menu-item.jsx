import styles from "../../src/components/root/root.module.css";

export const MenuItem = ({ icon, text, route }) => (
  <li>
    <a className={styles.dashboardLinkWrapper} href={route}>
      {icon}
      <span className={styles.dashboardText}>{text}</span>
    </a>
  </li>
);
