import { useEffect, useState } from 'react'
import DataDashboard from './dataDashboard/DataDashboard';
import DashboardControl from './DashboardControl';


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

    return (
        <>
            <DashboardControl
                request={request}
                status={status}
                dashboardStatus={dashboardStatus} 

                setStatus={setStatus}
                setStats={setStats}
                setCollectionProperties={setCollectionProperties} 
                setRequest={setRequest}

                shapefileCollection={props.shapefileCollection}
                gisjoin={props.gisjoin}
                currentShapeName={props.currentShapeName}
                setShapefileCollection={props.setShapefileCollection}
                setSparsityData={props.setSparsityData} 
                sparsityData={props.sparsityData}
                setSelectedIndex={props.setSelectedIndex} 
            />

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
