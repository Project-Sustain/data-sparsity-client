import { useEffect, useState } from 'react'
import { Container, Stack } from '@mui/material';
import { makeStyles } from "@material-ui/core";
import UseConnectionStatus from '../hooks/UseConnectionStatus';
import ApplicationStatus from './ApplicationStatus';
import SparsityScoresChart from './dataDashboard/charts/SparsityScoresChart';
import EpochTimeChart from './dataDashboard/charts/EpochTimeChart';
import RequestForm from './request/RequestForm';
import ScorePieChart from './dataDashboard/charts/ScorePieChart';
import SiteData from './dataDashboard/SiteData';
import DashboardCurator from './dataDashboard/DashboardCurator';

const useStyles = makeStyles({
    root: {
        zIndex: 5000,
    },
});

export default function Dashbaord(props) {
    const classes = useStyles();

    const { serverConnection, DbConnection } = UseConnectionStatus();
    const [scores, setScores] = useState([]);
    const [status, setStatus] = useState("");

    const [standardDeviation, setStandardDeviation] = useState();
    const [mean, setMean] = useState();

    const [request, setRequest] = useState(true);
    const [appStatus, setAppStatus] = useState(true);
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
        {"label": "Pie Chart", "check": pieChart,"set": setPieChart},
        {"label": "Bar Chart", "check": barChart,"set": setBarChart},
        {"label": "Site Data", "check": siteData,"set": setSiteData},
        {"label": "Time Series", "check": lineChart,"set": setLineChart}
        ]);
    }, [request, appStatus, pieChart, barChart, lineChart, siteData]); 

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
                    setStatus={setStatus} 
                    setSparsityData={props.setSparsityData} 
                    setSelectedIndex={props.setSelectedIndex} 
                    setMean={setMean}
                    setStandardDeviation={setStandardDeviation}
                />
                <DashboardCurator 
                    dashboardStatus={dashboardStatus} 
                    status={status} 
                />
                </Stack>
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
                        mean={mean}
                        standardDeviation={standardDeviation}
                    />
                </Stack>
            </Container>

            <Container maxWidth='auto'>
                <SiteData 
                    status={status} 
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
