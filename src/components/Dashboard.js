import { useEffect, useState } from 'react'
import { Container, Stack, Paper, Typography, LinearProgress, CircularProgress } from '@mui/material';
import UseConnectionStatus from '../hooks/UseConnectionStatus';
import ApplicationStatus from './ApplicationStatus';
import SparsityScoresChart from './dataDashboard/charts/SparsityScoresChart';
import EpochTimeChart from './dataDashboard/charts/EpochTimeChart';
import RequestForm from './request/RequestForm';
import ScorePieChart from './dataDashboard/charts/ScorePieChart';
import SiteData from './dataDashboard/SiteData';
import DashboardCurator from './dataDashboard/DashboardCurator';
import StatisticalInfo from './dataDashboard/StatisticalInfo';
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

export default function Dashbaord(props) {
    const classes = useStyles();

    const { serverConnection, DbConnection } = UseConnectionStatus();
    const [scores, setScores] = useState([]);
    const [status, setStatus] = useState("");

    const [collectionProperties, setCollectionProperties] = useState([]);
    const [stats, setStats] = useState({});

    const [request, setRequest] = useState(true);
    const [appStatus, setAppStatus] = useState(true);
    const [statInfo, setStatInfo] = useState(true);
    const [pieChart, setPieChart] = useState(true);
    const [barChart, setBarChart] = useState(true);
    const [lineChart, setLineChart] = useState(true);
    const [siteData, setSiteData] = useState(true);
    const [dashboardStatus, setDashbaordStatus] = useState([]);

    useEffect(() => {
        const tempScores = props.sparsityData.map((siteData) => {return siteData.sparsityScore});
        setScores(tempScores);
    }, [props.sparsityData])

    useEffect(() => {
        setDashbaordStatus([
        {"label": "Application Status", "check": appStatus,"set": setAppStatus},
        {"label": "Request Form", "check": request, "set": setRequest},
        {"label": "Statistical Info", "check": statInfo, "set": setStatInfo},
        {"label": "Pie Chart", "check": pieChart, "set": setPieChart},
        {"label": "Bar Chart", "check": barChart, "set": setBarChart},
        {"label": "Site Data", "check": siteData, "set": setSiteData},
        {"label": "Time Series", "check": lineChart, "set": setLineChart}
        ]);
    }, [request, appStatus, pieChart, barChart, lineChart, siteData, statInfo]); 

    const DataDashboard = () => {
        if(status === "VALID" && props.sparsityData.length > 0) {
            console.log(props.sparsityData)
            console.log(stats)
            return (
                <>
                    <Container maxWidth='auto'>
                        <StatisticalInfo 
                            inDashboard={statInfo} 
                            status={status} 
                            stats={stats}
                        />
                    </Container>
    
                    <Container maxWidth='auto'>
                        <Stack direction='row' justifyContent='space-evenly'>
                            <ScorePieChart 
                                inDashboard={pieChart} 
                                status={status} 
                                scores={scores} 
                            />
                            <SparsityScoresChart 
                                inDashboard={barChart} 
                                status={status} 
                                scores={scores} 
                                sparsityData={props.sparsityData}
                            />
                        </Stack>
                    </Container>
    
                    <Container maxWidth='auto'>
                        <SiteData 
                            status={status} 
                            collectionProperties={collectionProperties}
                            inDashboard={siteData} 
                            selectedIndex={props.selectedIndex} 
                            sparsityData={props.sparsityData} 
                            scores={scores} 
                            setSelectedIndex={props.setSelectedIndex} 
                        />
                    </Container>
    
                    <Container maxWidth='auto'>
                        <EpochTimeChart 
                            inDashboard={lineChart} 
                            status={status} 
                            sparsityData={props.sparsityData} 
                        />
                    </Container>
                </>
            );
        }
    
        else if(status === "PENDING") {
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
    
        else {
            return (
                <Stack direction='column' alignItems='center' justifyContent='center'>
                    <Paper elevation={3} className={classes.loading}>
                        <Typography variant='h4' align='center'>No Data Matching Request</Typography>
                    </Paper>
                </Stack>
            );
        }
    
    }

    return (
        <>
            <Container maxWidth='auto'>
                <Stack direction='row' justifyContent='flex-end' alignItems='stretch'>
                <ApplicationStatus
                    inDashboard={appStatus} 
                    serverConnection={serverConnection} 
                    DbConnection={DbConnection} 
                    setSparsityData={props.setSparsityData} 
                    setSelectedIndex={props.setSelectedIndex} 
                />
                <RequestForm 
                    inDashboard={request}
                    status={status}
                    shapefileCollection={props.shapefileCollection}
                    gisjoin={props.gisjoin}
                    currentShapeName={props.currentShapeName}
                    setShapefileCollection={props.setShapefileCollection}
                    setStatus={setStatus}
                    setStats={setStats}
                    setCollectionProperties={setCollectionProperties} 
                    setSparsityData={props.setSparsityData} 
                    setSelectedIndex={props.setSelectedIndex} 
                />
                <DashboardCurator 
                    dashboardStatus={dashboardStatus} 
                    status={status} 
                />
                </Stack>
            </Container>

            <DataDashboard />
        </>
    )

}
