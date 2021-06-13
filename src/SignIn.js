import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { BrowserRouter as Router, Route,Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import UserInfo from "./UserInfo"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Email registration
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const [userData,setUserData]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')


  const handleEmail=(e)=>{
  
    setEmail(e.target.value)
}

const handlePassword=(e)=>{
   
  setPassword(e.target.value)
  

}

const handleClick=(event)=>{
  event.preventDefault()
  fetch("/mydatas").then(res=>{
    if(res.ok) {
      return res.json()
    }
  }).then(jsonRes=>{
    console.log(jsonRes)
    let res;
      jsonRes.forEach(element => {
          if(element.email===email && element.password===password) {
         res=element
              return
          } 
     
      });
      if (res) {
        setUserData(res)
      } else {
        alert('incorrect data')
        setEmail('')
        setPassword('')
      }
  
})}
  const classes = useStyles();

  return (
    <>
   {!userData && <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
             value={email} 
             onChange={handleEmail}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            value={password} 
            onChange={handlePassword}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
         
      
            <Button
            onClick={handleClick}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>} 
    {userData && <UserInfo name={userData.userName} data={userData.email} date={userData.date}/>}
    </>
  );
}

