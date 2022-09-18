import { Paper, Typography, LinearProgress, Stack } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import SparsityTable from "./SparsityTable";
import SelectedSite from "./SelectedSite";

const useStyles = makeStyles({
    loading: {
        margin: "10px",
        padding: "10px",
        zIndex: '5000',
        opacity: '0.9'
    },
    table: {
        margin: '10px',
        padding: '10px',
        width: '40vw',
        zIndex: '5000',
        opacity: '0.9'
    },
    site: {
        margin: '10px',
        padding: '10px',
        width: '60vw',
        zIndex: '5000',
        opacity: '0.9'
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
                    <SelectedSite collectionProperties={props.collectionProperties} site={props.sparsityData[props.selectedIndex]} scores={props.scores} />
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