import { Paper, Stack } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import SparsityTable from "./SparsityTable";
import SelectedSite from "./SelectedSite";

const useStyles = makeStyles({
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
                    <SparsityTable 
                        selectedIndex={props.selectedIndex} 
                        setSelectedIndex={props.setSelectedIndex} 
                        sparsityData={props.sparsityData} 
                    />
                </Paper>
                <Paper className={classes.site} elevation={3}>
                    <SelectedSite 
                        setMapViewState={props.setMapViewState}
                        setSparsityData={props.setSparsityData} 
                        sparsityData={props.sparsityData} 
                        collectionProperties={props.collectionProperties} 
                        index={props.selectedIndex} site={props.sparsityData[props.selectedIndex]} 
                        scores={props.scores} 
                        lastHighlight={props.lastHighlight}
                        setLastHighlight={props.setLastHighlight}
                    />
                </Paper>
            </Stack>
        );
    }

    else return null;
}