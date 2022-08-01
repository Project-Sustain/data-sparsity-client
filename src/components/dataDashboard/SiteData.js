import { Paper, Typography, LinearProgress, Stack } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import SparsityTable from "./SparsityTable";
import SelectedSite from "./SelectedSite";

const useStyles = makeStyles({
    loading: {
        margin: "10px",
        padding: "10px"
    },
    table: {
        margin: '10px',
        padding: '10px',
        width: '40vw'
    },
    site: {
        margin: '10px',
        padding: '10px',
        width: '60vw'
    }
});

export default function SiteData(props) {
    const classes = useStyles();
    
    if(props.status === "VALID" && props.inDashboard) {
        return (
            <Stack direction='row' justifyContent='space-evenly'>
                <Paper className={classes.table} elevation={3}>
                    <SparsityTable selectedIndex={props.selectedIndex} setSelectedIndex={props.setSelectedIndex} sparsityData={props.sparsityData} />
                </Paper>
                <Paper className={classes.site} elevation={3}>
                    <SelectedSite site={props.sparsityData[props.selectedIndex]} scores={props.scores} />
                </Paper>
            </Stack>
        );
    }

    else if(props.status === "INVALID" && props.inDashboard) {
        return (
            <Paper elevation={3} className={classes.loading}>
                <Typography>No Data Matching Request</Typography>
            </Paper>
        );
    }

    else if(props.status === "PENDING" && props.inDashboard) {
        return (
            <Paper elevation={3} className={classes.loading}>
                <Typography>Site Data Loading...</Typography>
                <LinearProgress />
            </Paper>
        );
    }

    else return null;
}