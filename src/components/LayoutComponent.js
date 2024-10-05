import { Grid, TextField, Button, Typography } from '@mui/material';

const LayoutComponent = () => {
    return (
        <Grid container spacing={2} padding={3}>
          <Grid item xs={12} sm={6}>
            <TextField label="Input 1" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Input 2" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Input 3" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Input 4" variant="outlined" fullWidth />
            <Typography variant="caption">This is a label for Input 4</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary">Submit</Button>
          </Grid>
        </Grid>
      );
    };

export default LayoutComponent;