import React from 'react';
import { motion } from 'framer-motion'

const Rectangle = ({height,x,y,xrot,yrot})=> <motion.rect variants={{hidden:{height:0,},visible:{height:height,transition:{duration:1.5,ease: "easeInOut"}}}} x={x} y={y} width="16" fill="#1976d2" transform={`rotate(180 ${xrot},${yrot})`}/>

const Logo = () => {
    return ( 
        <motion.svg height="78" width="100" initial="hidden" animate="visible">
          <Rectangle height="40" x="0" y="30" xrot="8" yrot="50"/>
          <Rectangle height="50" x="17" y="20" xrot="25" yrot="45"/>
          <Rectangle height="60" x="35" y="10" xrot="43" yrot="40"/>
          <Rectangle height="70" x="52" y="0" xrot="60" yrot="35"/>
          <polygon points="0,50 35,70 0,70" fill="white"/>
          <polygon points="35,70 70,58 70,70" fill="white"/>
          <motion.path variants={{hidden:{pathLength:0,},visible:{pathLength:1,transition:{duration:1.5,ease: "easeInOut"}}}} d="M 0 55 L 35 76 L 75 62 L 73 58 L 82 58 L 76 65 L 75 62" fill="none" stroke="#1976d2" strokeWidth="5" /> 
        </motion.svg>
     );
}
 
export default Logo;