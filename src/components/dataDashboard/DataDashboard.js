import { Container, Stack, Paper, Typography, LinearProgress } from '@mui/material';
import SparsityScoresChart from './charts/SparsityScoresChart';
import EpochTimeChart from './charts/EpochTimeChart';
import PieControl from './charts/pieChart/PieControl';
import SiteData from './SiteList/SiteData';
import StatisticalInfo from './StatisticalInfo';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    loading: {
        margin: "10px",
        padding: "10px",
        width: '50vh',
        zIndex: 5000,
        opacity: 0.9
    },
});

export default function DataDashbaord(props) {
    const classes = useStyles();

    if(props.status === "VALID" && props.sparsityData.length > 0) {
        return (
            <>
                <Container maxWidth='auto'>
                    <StatisticalInfo 
                        inDashboard={props.statInfo} 
                        status={props.status} 
                        stats={props.stats}
                    />
                </Container>

                <Container maxWidth='auto'>
                    <Stack direction='row' justifyContent='space-evenly'>
                        <PieControl 
                            inDashboard={props.pieChart} 
                            status={props.status} 
                            scores={props.scores} 
                        />
                        <SparsityScoresChart 
                            inDashboard={props.barChart} 
                            status={props.status} 
                            scores={props.scores} 
                            sparsityData={props.sparsityData}
                        />
                    </Stack>
                </Container>

                <Container maxWidth='auto'>
                    <SiteData 
                        setMapViewState={props.setMapViewState}
                        status={props.status} 
                        collectionProperties={props.collectionProperties}
                        inDashboard={props.siteData} 
                        selectedIndex={props.selectedIndex} 
                        setSparsityData={props.setSparsityData}
                        sparsityData={props.sparsityData} 
                        scores={props.scores} 
                        setSelectedIndex={props.setSelectedIndex}
                        lastHighlight={props.lastHighlight}
                        setLastHighlight={props.setLastHighlight} 
                    />
                </Container>

                <Container maxWidth='auto'>
                    <EpochTimeChart 
                        inDashboard={props.lineChart} 
                        status={props.status} 
                        sparsityData={props.sparsityData} 
                    />
                </Container>
            </>
        );
    }

    else if(props.status === "PENDING") {
        return (
            <Stack direction='column' alignItems='center' justifyContent='center'>
                <Paper elevation={3} className={classes.loading}>
                    <LinearProgress className={classes.progressBar} color='primary' />
                    <Typography variant='h4' align='center'>Data Loading...</Typography>
                    <LinearProgress className={classes.progressBar} color='primary' />
                </Paper>
            </Stack>
        );
    }

    else if(props.status === "INVALID"){
        return (
            <Stack direction='column' alignItems='center' justifyContent='center'>
                <Paper elevation={3} className={classes.loading}>
                    <Typography variant='h4' align='center'>No Data Matching Request</Typography>
                </Paper>
            </Stack>
        );
    }

    else return null;
    

}
