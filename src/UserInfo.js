import React,{useState,useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import image from "./images/user.jpg";


const styles = ((theme) => ({
   info: {
     marginTop: "20vh",
     marginLeft: "40vw",
     
   }
}))
function UserInfo(props) {

  

   const { classes } = props
  return (
    <div className={classes.info}>
       
         <img src={image} style={{width:"150px", height:"150px"}} />
          <div >User: {props.name}</div>
          <div>Email:{props.data}</div>
       
       
         
    </div>
  );
}

export default withStyles(styles)(UserInfo);