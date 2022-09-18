import { useEffect, useState } from 'react'
import { Container, Stack } from '@mui/material';
import UseConnectionStatus from '../hooks/UseConnectionStatus';
import ApplicationStatus from './ApplicationStatus';
import SparsityScoresChart from './dataDashboard/charts/SparsityScoresChart';
import EpochTimeChart from './dataDashboard/charts/EpochTimeChart';
import RequestForm from './request/RequestForm';
import ScorePieChart from './dataDashboard/charts/ScorePieChart';
import SiteData from './dataDashboard/SiteData';
import DashboardCurator from './dataDashboard/DashboardCurator';
import StatisticalInfo from './dataDashboard/StatisticalInfo';

export default function Dashbaord(props) {

    const { serverConnection, DbConnection } = UseConnectionStatus();
    const [scores, setScores] = useState([]);
    const [status, setStatus] = useState("");

    const [collectionProperties, setCollectionProperties] = useState([]);

    const [meanDifference, setMeanDifference] = useState();
    const [standardDeviationDifference, setStandardDeviationDifference] = useState();
    const [meanObservations, setMeanObservations] = useState();
    const [standardDeviationObservations, setStandardDeviationObservations] = useState();

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
                    setCollectionProperties={setCollectionProperties} 
                    setSparsityData={props.setSparsityData} 
                    setSelectedIndex={props.setSelectedIndex} 
                    setMeanDifference={setMeanDifference}
                    setStandardDeviationDifference={setStandardDeviationDifference}
                    setMeanObservations={setMeanObservations}
                    setStandardDeviationObservations={setStandardDeviationObservations}
                />
                <DashboardCurator 
                    dashboardStatus={dashboardStatus} 
                    status={status} 
                />
                </Stack>
            </Container>

            <Container maxWidth='auto'>
                <StatisticalInfo 
                    inDashboard={statInfo} 
                    status={status} 
                    meanDifference={meanDifference}
                    standardDeviationDifference={standardDeviationDifference}
                    meanObservations={meanObservations}
                    standardDeviationObservations={standardDeviationObservations}
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
