import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/VehicleCards.module.css';
import { motion } from "framer-motion";

let easing = [0.6, -0.05, 0.01, 0.99];
const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing }
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easing,
      when: "beforeChildren"
    }
  }
};

const imageMove = {
  initial: {
    opacity: 0,
    x: 100
  },
  animate: {
    opacity: 1,
    x: 0,
  }
}


const VehicleCard = ({id, name, price, image, image_two}) => {
  return (
    <Link href={`/${id}`}>
      <motion.a className={`${styles.card}`}
        variants={fadeInUp}
        whileHover={{ scale: 1.05, boxShadow: "0 2px 13px 2px rgba(0,0,0,0.1)" }}
        whileTap={{ scale: 0.92, boxShadow: "0 2px 13px 2px rgba(0,0,0,0.1)" }}
      >
        <div className={styles.card}>
          <div className="h2 card__name">{name}</div>
          <div className="h6 card__price">{price}</div>
        </div>
        <motion.div
          variants={imageMove}
        >
          <motion.div className={styles.cardcontainer} whileHover={{ x: '-100%', transition: { duration: 0.5 }}} whileTap={{ x: '-100%', transition: { duration: 0.5 }}}>
            <Image
              className="card__image"
              src={ image }
              alt={ name }
              layout="responsive"
              width={550}
              height={220}
            />
            <Image
              className="card__image"
              src={ image_two }
              alt={ name }
              layout="responsive"
              width={550}
              height={220}
            />
          </motion.div>
        </motion.div>
      </motion.a>
    </Link>
  )
}

export default VehicleCard