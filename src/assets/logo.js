import React from 'react';
import { motion } from 'framer-motion'

const Logo = () => {
    return ( 
        <motion.svg height="78" width="100" initial="hidden" animate="visible">
          <motion.rect variants={{hidden:{height:0,},visible:{height:40,transition:{duration:1.5,ease: "easeInOut"}}}} x="0" y="30"  width="16" fill="#1976d2" transform="rotate(180 8,50)"/>
          <motion.rect variants={{hidden:{height:0,},visible:{height:50,transition:{duration:1.5,ease: "easeInOut"}}}} x="17" y="20" width="16" fill="#1976d2" transform="rotate(180 25,45)"/>
          <motion.rect variants={{hidden:{height:0,},visible:{height:60,transition:{duration:1.5,ease: "easeInOut"}}}} x="35" y="10" width="16" fill="#1976d2" transform="rotate(180 43,40)"/>
          <motion.rect variants={{hidden:{height:0,},visible:{height:70,transition:{duration:1.5,ease: "easeInOut"}}}} x="52" y="0" width="16" fill="#1976d2" transform="rotate(180 60,35)"/>
          {/* <motion.rect variants={{hidden:{height:0,},visible:{height:80,transition:{duration:2,ease: "easeInOut"}}}} x="0" y="100"  width="30" fill="#1976d2" transform="rotate(180 15,140)"/>
          <motion.rect variants={{hidden:{height:0,},visible:{height:100,transition:{duration:2,ease: "easeInOut"}}}} x="35" y="80" width="30" fill="#1976d2" transform="rotate(180 50,130)"/>
          <motion.rect variants={{hidden:{height:0,},visible:{height:120,transition:{duration:2,ease: "easeInOut"}}}} x="70" y="60" width="30" fill="#1976d2" transform="rotate(180 85,120)"/>
          <motion.rect variants={{hidden:{height:0,},visible:{height:140,transition:{duration:2,ease: "easeInOut"}}}} x="105" y="40" width="30" fill="#1976d2" transform="rotate(180 120,110)"/> */}
          <polygon points="0,50 35,70 0,70" fill="white"/>
          <polygon points="35,70 70,58 70,70" fill="white"/>
          <motion.path variants={{hidden:{pathLength:0,},visible:{pathLength:1,transition:{duration:1.5,ease: "easeInOut"}}}} d="M 0 55 L 35 76 L 75 62 L 73 58 L 82 58 L 76 65 L 75 62  " fill="none" stroke="#1976d2" strokeWidth="2" /> 
        </motion.svg>
     );
}
 
export default Logo;