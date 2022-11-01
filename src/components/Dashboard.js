import { useEffect, useState } from 'react'
import { Container, Stack } from '@mui/material';
import RequestForm from './request/RequestForm';
import DashboardCurator from './dataDashboard/DashboardCurator';
import MapLegend from './MapLegend';
import DataDashboard from './dataDashboard/DataDashboard';


export default function Dashbaord(props) {

    const [scores, setScores] = useState([]);
    const [status, setStatus] = useState("");

    const [collectionProperties, setCollectionProperties] = useState([]);
    const [stats, setStats] = useState({});

    const [request, setRequest] = useState(true);
    const [statInfo, setStatInfo] = useState(false);
    const [pieChart, setPieChart] = useState(false);
    const [barChart, setBarChart] = useState(false);
    const [lineChart, setLineChart] = useState(false);
    const [siteData, setSiteData] = useState(false);
    const [dashboardStatus, setDashbaordStatus] = useState([]);

    useEffect(() => {
        const tempScores = props.sparsityData.map((siteData) => {return siteData.sparsityScore});
        setScores(tempScores);
    }, [props.sparsityData])

    useEffect(() => {
        setDashbaordStatus([
        {"label": "Request Form", "check": request, "set": setRequest},
        {"label": "Statistical Info", "check": statInfo, "set": setStatInfo},
        {"label": "Pie Chart", "check": pieChart, "set": setPieChart},
        {"label": "Bar Chart", "check": barChart, "set": setBarChart},
        {"label": "Site Data", "check": siteData, "set": setSiteData},
        {"label": "Time Series", "check": lineChart, "set": setLineChart}
        ]);
    }, [request, pieChart, barChart, lineChart, siteData, statInfo]); 

    const RenderLegend = () => {
        if(status === "VALID" && props.sparsityData.length > 0) {
            return (
                <MapLegend 
                    min={props.sparsityData[0].sparsityScore} 
                    max={props.sparsityData[props.sparsityData.length-1].sparsityScore}
                />
            );
        }
        else return null;
    }

    return (
        <>
            <Container maxWidth='auto'>
                <Stack direction='row' justifyContent='flex-end' alignItems='stretch'>
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
                        setRequest={setRequest}
                        setSparsityData={props.setSparsityData} 
                        setSelectedIndex={props.setSelectedIndex} 
                    />
                    <RenderLegend/>
                    <DashboardCurator 
                        dashboardStatus={dashboardStatus} 
                        status={status} 
                    />
                </Stack>
            </Container>

            <DataDashboard
                scores={scores}
                status={status}
                stats={stats}
                collectionProperties={collectionProperties}

                sparsityData={props.sparsityData}
                setSparsityData={props.setSparsityData}
                selectedIndex={props.selectedIndex} 
                setSelectedIndex={props.setSelectedIndex} 
                setMapViewState={props.setMapViewState}

                statInfo={statInfo}
                pieChart={pieChart}
                barChart={barChart}
                lineChart={lineChart}
                siteData={siteData}
            />
        </>
    )

}
