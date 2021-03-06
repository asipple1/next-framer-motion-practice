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


const parentVariant = {
  initial: {
    x: '-100vw',
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      when: 'beforeChildren',
    }
  },
  exit: {
    x: '-100vw',
    opacity: 0,
    transition: {
      duration: 0.4,
      when: 'afterChildren',
    }
  }
}

const imageVariant = {
  initial: {
    opacity: 0,
    x: "-100vw"
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
    }
  },
  exit: {
    opacity: 0,
    x: "-100vw"
  }
}

const textContainerVariant = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      when: 'beforeChildren',
    }
  },
  exit: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      when: 'afterChildren',
    }
  }
}

const textElementVariant = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
    }
  },
  exit: { 
    y: 60,
    opacity: 0,
  }
}


const VehicleDetails = ({ vehicle }) => {
  return (
      <motion.div className={styles.grid}
        variants={parentVariant}
        initial='initial' 
        animate='animate' 
        exit='exit'
      >
        <div className={styles.left}>
          <motion.div variants={imageVariant}>
            <Image
              src={ vehicle.image }
              alt={ vehicle.name }
              layout="responsive"
              width={700}
              height={280}
            />
          </motion.div>

        </div>
        <motion.div className={styles.right} variants={textContainerVariant}>
          <Link href='/'>
            <motion.div variants={textElementVariant}
            >
              <a className={styles.back}>Back to products</a>
            </motion.div>
          </Link>
          <motion.div className="h5" variants={textElementVariant}
          >{ vehicle.price }</motion.div>
          <motion.div className={`h1 ${styles.headline}`} variants={textElementVariant}
          >
            { vehicle.name }
          </motion.div>
          <motion.p variants={textElementVariant}
          >{ vehicle.details }</motion.p>
        </motion.div>
      </motion.div>
  )
}

export default VehicleDetails;