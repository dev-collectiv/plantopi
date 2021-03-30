import styles from './TopCard.module.scss';

const BottomCard: React.FC<{ title: string }> = ({ children, title }) => {
  return (
    <div className={`${styles.card}`}>
      <h2 className={styles.title}>{title || 'please select an area'}</h2>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default BottomCard;
