import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {Paper , Box} from '@mui/material';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
        <Typography variant="h6" color="inherit" component="div">
          NFT
      </Typography>

         
        </Toolbar>
      </AppBar>
      <Box>
      <Paper className="Main-paper" elevation={3}/> 
  
      </Box>
    </div>
  );
}

export default App;
