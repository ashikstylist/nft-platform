import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {Paper , Box, Typography} from '@mui/material';


function App() {
  return (
    <div className="App">
      <AppBar position="static" style={{backgroundColor:'#222'}}>
        <Toolbar>
        <Typography variant="h6" color="inherit" component="div">
          NFT
      </Typography>

         
        </Toolbar>
      </AppBar>
      <Box sx={{
        display: 'flex',
        '& > :not(style)': {
          m: 1,
          width: '100%',
          height: 128,
          backgroundColor: '#3d5afe '
        },
      }}>
      <Paper className="Main-paper" elevation={3}/> 
  
      </Box>
    </div>
  );
}

export default App;
