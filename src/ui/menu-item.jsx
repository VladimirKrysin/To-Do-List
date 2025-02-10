import styles from "../../src/components/root/root.module.css";

export const MenuItem = ({ icon, text, link }) => (
  <li>
    <a className={styles.dashboardLinkWrapper} href={link}>
      {icon}
      <span className={styles.dashboardText}>{text}</span>
    </a>
  </li>
);
