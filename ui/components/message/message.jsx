import styles from "./message.module.scss"
import { format } from "timeago.js";

export default function Message({ message, own }) {
  return (
    <div className={own ? styles.message + ' ' + own : styles.message}>
      <div className={styles.messageTop} >
        <img
          className={styles.messageImg}
          src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <p className={styles.messageText}>
          <span>{message?.senderName}</span>
          {message?.text}
          </p>
      </div>
      <div className={styles.messageBottom}>{format(message?.createdAt)}</div>
    </div>
  );
}