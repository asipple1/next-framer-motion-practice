import Head from 'next/head'
import { vehiclesData } from './api/vehiclesData';
import styles from '../styles/Home.module.css'
import VehicleCard from '../componets/VehicleCard';
import { motion } from "framer-motion";

const stagger = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
  }
};



export default function Home({vehicles}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <motion.div className={styles.grid}
        variants={stagger}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {vehicles.map(vehicle => (
          <VehicleCard 
            id={vehicle.id}
            key={vehicle.id}
            name={vehicle.name} 
            image={vehicle.image} 
            price={vehicle.price}
          />
        )
        )}
      </motion.div>
    </div>
  )
}


export const getStaticProps = async () => {
  return {
    props: {
      vehicles: vehiclesData
    }
  }
}