import { useEffect, useState } from 'react'
import UseConnectionStatus from './hooks/UseConnectionStatus';
import Dashbaord from './components/Dashboard';
import UsMap from './components/UsMap';

export default function App() {
    const { serverConnection, DbConnection } = UseConnectionStatus();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [sparsityData, setSparsityData] = useState([]);

    return (
        <>
            <Dashbaord 
                sparsityData={sparsityData} 
                setSparsityData={setSparsityData} 
                selectedIndex={selectedIndex} 
                setSelectedIndex={setSelectedIndex}
            />
            <UsMap data={sparsityData} />
        </>
    );
}
