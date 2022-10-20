import { useState } from 'react'
import Dashbaord from './components/Dashboard';
import UsMap from './components/UsMap';

export default function App() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [sparsityData, setSparsityData] = useState([]);
    const [shapefileCollection, setShapefileCollection] = useState();

    return (
        <>
            <UsMap 
                data={sparsityData} 
                shapefileCollection={shapefileCollection}    
            />
            <Dashbaord 
                shapefileCollection={shapefileCollection}
                setShapefileCollection={setShapefileCollection}
                sparsityData={sparsityData} 
                setSparsityData={setSparsityData}
                selectedIndex={selectedIndex} 
                setSelectedIndex={setSelectedIndex}
            />
        </>
    );
}
