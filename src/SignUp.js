import React,{useState,useEffect} from 'react';
import { BrowserRouter as Router, Route,Link } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
       <span color="inherit" href="https://material-ui.com/">
        Email registration
      </span>{' '}
     
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

export default function SignUp() {

  const [userName,setUserName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [errorPassword,setErrorPassword]=useState(false)
  const [errorEmail,setErrorEmail]=useState(false)
  const [errorUserName,setErrorUserName]=useState(false)



  const handleUserName=(e)=>{

      let user=e.target.value
        if (user.length>=5) {
          setErrorUserName(false)
        } else  {
          setErrorUserName(true)
        }
       
      setUserName(e.target.value)
  }

  const handleEmail=(e)=>{
    let mailName=e.target.value
      if(/@mail.ru$/.test(mailName) || /@gmail.com$/.test(mailName) || /@yandex.ru$/.test(mailName)) {
         setErrorEmail(false)
      } else {
        setErrorEmail(true)
      }

      setEmail(e.target.value)
  }


  const handlePassword=(e)=>{
   
      if(e.target.value.length<6) {
          setErrorPassword(true)
      } else {

          if ( /\d/g.test(e.target.value) &&  /\p{Lu}/gu.test(e.target.value) && /\p{Ll}/gu.test(e.target.value)) {
            setErrorPassword(false) 
          } else  {
            setErrorPassword(true)
          }
       
       
      }

         setPassword(e.target.value)
  }


  const handleSubmit=(event)=>{
    
      event.preventDefault()
   
     if (errorEmail || errorPassword || errorUserName) {
         alert ('invalid datas')
     } else {
        fetch("/mydatas").then(res=>{
            if(res.ok) {
              return res.json()
            }
          }).then(jsonRes=>{
              jsonRes.forEach(element => {
                  if(element.email===email) {
                   return   alert('user with this email already exist')
                     
                  }
              });
              const registered={
        
                userName:userName,
                email:email,
                password:password
              }
        
              axios.post('http://localhost:4000/signup',registered).then(response=>{
                console.log(response.data)
              })
        
              setUserName('')
              setPassword('')
              setEmail('')
          })
        
      
     }
      
  }

  


  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
            error={errorUserName}
            value={userName}
            onChange={handleUserName}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            helperText={errorUserName?'at least 5 character':''}
            autoFocus
            
          />
          <TextField
          error={errorEmail}
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
            helperText={errorEmail?'use gmail.com, mail.ru, yandex.ru':''}
           
          />
     
          <TextField
          error={errorPassword}
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
            helperText={errorPassword?'at least 6 character, include digits, lowercase and uppercase letters':''}
          />
        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
            
            </Grid>
            <Grid item>
              <Link to="/SignIn" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}