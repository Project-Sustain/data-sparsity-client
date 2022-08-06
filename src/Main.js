import { useEffect, useState } from 'react'
import UseConnectionStatus from './hooks/UseConnectionStatus';
import DashboardCurator from './components/dataDashboard/DashboardCurator';
import Dashbaord from './components/Dashboard';
import UsMap from './components/UsMap';

export default function App() {
    const { serverConnection, DbConnection } = UseConnectionStatus();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [sparsityData, setSparsityData] = useState([]);
    const [scores, setScores] = useState([]);
    const [status, setStatus] = useState("");

    const [request, setRequest] = useState(true);
    const [appStatus, setAppStatus] = useState(true);
    const [pieChart, setPieChart] = useState(false);
    const [barChart, setBarChart] = useState(false);
    const [lineChart, setLineChart] = useState(false);
    const [siteData, setSiteData] = useState(true);
    const [dashboardStatus, setDashbaordStatus] = useState([]);

    useEffect(() => {
        const tempScores = sparsityData.map((siteData) => {return siteData.sparsityScore});
        setScores(tempScores);
    }, [sparsityData])

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
            <DashboardCurator dashboardStatus={dashboardStatus} status={status} />
            <Dashbaord
                state={{serverConnection, DbConnection, selectedIndex, sparsityData, scores,
                    status, request, appStatus, pieChart, barChart, lineChart, siteData}}
                set={{setSelectedIndex, setSparsityData, setScores, setStatus}}
            />
            <UsMap data={sparsityData} />
        </>
    );
}
