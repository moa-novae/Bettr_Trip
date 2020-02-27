import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import StartNow from "../../images/start_now.png";
import Image from 'react-bootstrap/Image';
import HomeImage from '../../images/home_page.png';
import { AnimatePresence, motion } from "framer-motion";

const pageTransition = {
  in: {
    opacity: 1,
    x: 0
  }, 
  out: {
    opacity: 0,
    x: "-100%"
  }
}

export default function() {
  return (
    <motion.div initial="out" animate="in" exit="out" variants={pageTransition} >
      <h3>This is Home</h3>
      <div>
        <h5>We are Logo! Plan your next trip with ease!</h5>
      </div>
      <div>
        <Link to='/trips'>
          <Image className={"start-now"} src={StartNow} fluid width="300px" />
        </Link>
        <Image className={"home-page-pic"} src={HomeImage} fluid width="1920px" />
      </div>
    </motion.div>
  );
}