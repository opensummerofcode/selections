import styles from '../assets/styles/button.module.css';

const SocialButton = ({ github = false, children, ...rest }) => {
  return (
    <button type="button" className={`${styles.button} ${github ? styles.github : ''}`} {...rest}>
      <div className={styles.iconWrapper}>
        {github && <img src="/img/icon-github.svg" alt="github logo" />}
      </div>
      {children}
    </button>
  );
};

export default SocialButton;
