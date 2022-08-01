import { makeStyles } from "@material-ui/core";
import { FormControlLabel, Paper, Stack, Typography, Checkbox } from '@mui/material';

const useStyles = makeStyles({
  root: {
    margin: "10px",
    padding: "10px",
    width: "20vw",
    zIndex: '5000',
    opacity: '0.9'
  }
});

export default function ApplicationStatus(props) {
  const classes = useStyles();
  if(props.inDashboard) {
    return (
      <Paper className={classes.root} elevation={3}>
        <Typography align="center" variant='h5'>Application Status</Typography>
        <Stack>
          <FormControlLabel
            label="Connected to Cluster"
            control={<Checkbox checked={props.serverConnection}/>}
          />
          <FormControlLabel
            label="Connected to Data Services"
            control={<Checkbox checked={props.DbConnection}/>}
          />
        </Stack>
      </Paper>
    );
  }
  else return null;
}
