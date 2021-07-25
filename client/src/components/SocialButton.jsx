import styles from '../assets/styles/button.module.css';

const SocialButton = ({ github = false, href = null, children, ...rest }) => {
  const classes = `${styles.button} ${github ? styles.github : ''}`;
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        <div className={styles.iconWrapper}>
          {github && <img src="/img/icon-github.svg" alt="github logo" />}
        </div>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      <div className={styles.iconWrapper}>
        {github && <img src="/img/icon-github.svg" alt="github logo" />}
      </div>
      {children}
    </button>
  );
};

export default SocialButton;
