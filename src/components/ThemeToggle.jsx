import styles from './ThemeToggle.module.css';

export default function ThemeToggle({ theme, toggleTheme }) {
  const buttonClass =
    theme === 'light'
      ? `${styles.button} ${styles.darkPreview}` // Show dark theme style
      : `${styles.button} ${styles.lightPreview}`; // Show light theme style

  return (
    <div className={styles.buttons}>
      <button className={buttonClass} onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
}
