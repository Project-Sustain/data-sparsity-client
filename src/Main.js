import { useState } from 'react'
import Dashbaord from './components/Dashboard';
import UsMap from './components/UsMap';

export default function App() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [sparsityData, setSparsityData] = useState([]);

    return (
        <>
            <UsMap data={sparsityData} />
            <Dashbaord 
                sparsityData={sparsityData} 
                setSparsityData={setSparsityData}
                selectedIndex={selectedIndex} 
                setSelectedIndex={setSelectedIndex}
            />
        </>
    );
}
