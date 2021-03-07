import '../styles/globals.css'
import { AnimatePresence, motion } from "framer-motion";
import { useTransitionFix } from "../componets/utils/useTransitionFix"


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
  const transitionCallback = useTransitionFix()
  return (
    <AnimatePresence exitBeforeEnter onExitComplete={transitionCallback}>
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
  )
}

export default MyApp
