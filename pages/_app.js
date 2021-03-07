import '../styles/globals.css'
import { AnimatePresence, motion } from "framer-motion";


const fadeInOut = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  }
};


function MyApp({ Component, pageProps, router }) {
  return (
  <AnimatePresence exitBeforeEnter>
    <motion.div key={router.route} variants={fadeInOut} initial="initial" animate="animate">
      <Component {...pageProps} />
    </motion.div>
  </AnimatePresence>
  )
}

export default MyApp
