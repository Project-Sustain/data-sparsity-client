import { Container, Stack } from '@mui/material';
import ApplicationStatus from './ApplicationStatus';
import SparsityScoresChart from './dataDashboard/charts/SparsityScoresChart';
import EpochTimeChart from './dataDashboard/charts/EpochTimeChart';
import RequestForm from './request/RequestForm';
import ScorePieChart from './dataDashboard/charts/ScorePieChart';
import SiteData from './dataDashboard/SiteData';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        margin: "10px",
        padding: "10px",
        zIndex: '5000',
        opacity: '0.9',
        overflow: 'auto'
    },
});

export default function Dashbaord(props) {
    const classes = useStyles();

    return (
        <>
            <Container maxWidth='auto'>
                <Stack direction='row' justifyContent='flex-end' alignItems='stretch'>
                <ApplicationStatus
                    inDashboard={props.state.appStatus} 
                    serverConnection={props.state.serverConnection} 
                    DbConnection={props.state.DbConnection} 
                    setSparsityData={props.set.setSparsityData} 
                    setSelectedIndex={props.set.setSelectedIndex} 
                />
                <RequestForm 
                    inDashboard={props.state.request} 
                    setStatus={props.set.setStatus} 
                    setSparsityData={props.set.setSparsityData} 
                    setSelectedIndex={props.set.setSelectedIndex} 
                />
                </Stack>
            </Container>

            <div className={classes.paper}>
                <Container maxWidth='auto'>
                    <Stack direction='row' justifyContent='space-evenly'>
                        <ScorePieChart 
                            inDashboard={props.state.pieChart} 
                            status={props.state.status} 
                            scores={props.state.scores} 
                        />
                        <SparsityScoresChart 
                            inDashboard={props.state.barChart} 
                            status={props.state.status} 
                            scores={props.state.scores} 
                            sparsityData={props.state.sparsityData} 
                        />
                    </Stack>
                </Container>

                <Container maxWidth='auto'>
                    <SiteData 
                        status={props.state.status} 
                        inDashboard={props.state.siteData} 
                        selectedIndex={props.state.selectedIndex} 
                        sparsityData={props.state.sparsityData} 
                        scores={props.state.scores} 
                        setSelectedIndex={props.set.setSelectedIndex} 
                    />
                </Container>

                <Container maxWidth='auto'>
                    <EpochTimeChart 
                        inDashboard={props.state.lineChart} 
                        status={props.state.status} 
                        sparsityData={props.state.sparsityData} 
                    />
                </Container>
            </div>
        </>
    );
}
