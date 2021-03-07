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
    x: -100
  },
  animate: {
    opacity: 1,
    x: 0,
  }
}


const VehicleCard = ({id, name, price, image, animationVariants}) => {
  return (
    <Link href={`/${id}`}>
      <motion.a className={`${styles.card}`}
        variants={fadeInUp}
        whileHover={{ scale: 1.05, boxShadow: "0 5px 13px 3px rgba(0,0,0,0.3)" }}
        whileTap={{ scale: 0.95, boxShadow: "0 5px 13px 3px rgba(0,0,0,0.3)" }}
      >
        <div className={styles.card}>
          <div className="h2 card__name">{name}</div>
          <div className="h6 card__price">{price}</div>
        </div>
        <motion.div
          variants={imageMove}
        >
          <Image
            className="card__image"
            src={ image }
            alt={ name }
            layout="responsive"
            width={550}
            height={220}
          />
        </motion.div>
      </motion.a>
    </Link>
  )
}

export default VehicleCard