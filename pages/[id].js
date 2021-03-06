import { vehiclesData } from './api/vehiclesData';
import Image from 'next/image'
import Link from 'next/link';
import styles from '../styles/VehicleDetails.module.css'
import { motion } from "framer-motion";


// Generate routes for vehicles
export const getStaticPaths = async () => {
  const paths = vehiclesData.map(vehicle => {
    return {
      params: { id: vehicle.id }
    }
  })
  return {
    paths,
    fallback: false
  }
}


export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = vehiclesData.find(vehicle => vehicle.id == id);
  return {
    props: {
      vehicle: data
    }
  }
}

let easing = [0.6, -0.05, 0.01, 0.99];

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.07,
      delay: 0.5
    }
  }
};

const fadeInRight = {
  initial: {
    x: '-100vw',
    opacity: 0,
    transition: { duration: 0.6, ease: easing }
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    }
  }
};

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
      duration: 0.6,
    }
  },
  exit: { 
    opacity: 0,
  }
};


const VehicleDetails = ({ vehicle }) => {
  return (
      <motion.div className={styles.grid}
        layoutId={vehicle.id}
        variants={fadeInRight}
        initial='initial' 
        animate='animate' 
        exit={{ 
          opacity: 0,
        }}
      >
        <div className={styles.left}>
          <motion.div
            initial={{
              opacity: 0,
              x: "-100vw"
            }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.6,
                ease: easing,
                delay: 0.3,
              }
            }}
            exit={{ 
              opacity: 0,
            }}
          >
            <Image
              src={ vehicle.image }
              alt={ vehicle.name }
              layout="responsive"
              width={700}
              height={280}
            />
          </motion.div>

        </div>
        <motion.div className={styles.right} variants={stagger}>
          <Link href='/'>
            <motion.div variants={fadeInUp}
            >
              <a className={styles.back}>Back to products</a>
            </motion.div>
          </Link>
          <motion.div className="h5" variants={fadeInUp}
          >{ vehicle.price }</motion.div>
          <motion.div className={`h1 ${styles.headline}`} variants={fadeInUp}
          >
            { vehicle.name }
          </motion.div>
          <motion.p variants={fadeInUp}
          >{ vehicle.details }</motion.p>
        </motion.div>
      </motion.div>
  )
}

export default VehicleDetails;