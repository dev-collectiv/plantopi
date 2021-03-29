import styles from './TopCard.module.scss';

const BottomCard: React.FC = ({ children }) => {
  return <div className={`${styles.card}`}>{children}</div>;
};

export default BottomCard;
