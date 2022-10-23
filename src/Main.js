import { useState } from 'react'
import Dashbaord from './components/Dashboard';
import UsMap from './components/UsMap';

export default function App() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [sparsityData, setSparsityData] = useState([]);
    const [shapefileCollection, setShapefileCollection] = useState('STATE');
    const [gisjoin, setGisjoin] = useState('G080');
    const [currentShapeName, setCurrentShapeName] = useState('Colorado');

    return (
        <>
            <UsMap 
                data={sparsityData} 
                shapefileCollection={shapefileCollection}   
                setGisjoin={setGisjoin} 
                setCurrentShapeName={setCurrentShapeName}
            />
            <Dashbaord 
                gisjoin={gisjoin}
                currentShapeName={currentShapeName}
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
