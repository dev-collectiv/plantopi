import styles from './TopCard.module.scss';

const BottomCard: React.FC<{ title: string }> = ({ children, title }) => {
  return (
    <div className={`${styles.card}`}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </div>
  );
};

export default BottomCard;
