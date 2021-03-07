import { vehiclesData } from './api/vehiclesData';
import Image from 'next/image'
import Link from 'next/link';
import styles from '../styles/VehicleDetails.module.css'
import { motion, AnimatePresence } from "framer-motion";


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
    opacity: 0,
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
    // opacity: 0,
    // x: "-100vw"
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
    // opacity: 0,
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
    // y: 60,
    // opacity: 0,
  }
}


const VehicleDetails = ({ vehicle }) => {
  return (
      <motion.div
                layout
        variants={parentVariant}
        initial='initial' 
        animate='animate' 
        exit='exit'
      >
        <AnimatePresence exitBeforeEnter>
          <div className={styles.grid}>

              <div className={styles.left}>
                <motion.div variants={imageVariant} key={`${vehicle.id}-1`}>
                  <Image
                    src={ vehicle.image }
                    alt={ vehicle.name }
                    layout="responsive"
                    width={700}
                    height={280}
                  />
                </motion.div>

              </div>
              <motion.div className={styles.right} variants={textContainerVariant} key={`${vehicle.id}-2`}>
                <Link href='/'>
                  <motion.div variants={textElementVariant} key={`${vehicle.id}-3`}>
                    <a className={styles.back}>Back to products</a>
                  </motion.div>
                </Link>
                <motion.div className="h5" variants={textElementVariant} key={`${vehicle.id}-4`}>{ vehicle.price }</motion.div>
                <motion.div className={`h1 ${styles.headline}`} variants={textElementVariant} key={`${vehicle.id}-5`}>
                  { vehicle.name }
                </motion.div>
                <motion.p variants={textElementVariant} key={`${vehicle.id}-6`}>{ vehicle.details }</motion.p>
              </motion.div>
          </div>
        </AnimatePresence>
      </motion.div>
  )
}

export default VehicleDetails;