import { useState } from 'react'
import Dashbaord from './components/Dashboard';
import UsMap from './components/UsMap';

export default function App() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [sparsityData, setSparsityData] = useState([]);
    const [shapefileCollection, setShapefileCollection] = useState('STATE');
    const [gisjoin, setGisjoin] = useState('G080');
    const [currentShapeName, setCurrentShapeName] = useState('Colorado');
    const [mapViewState, setMapViewState] = useState({
        longitude: -98.5795,
        latitude: 39.8283,
        zoom: 4.3,
        pitch: 30,
        bearing: 0
    });

    return (
        <>
            <UsMap 
                mapViewState={mapViewState}
                setMapViewState={setMapViewState}
                data={sparsityData} 
                shapefileCollection={shapefileCollection}   
                setGisjoin={setGisjoin} 
                setCurrentShapeName={setCurrentShapeName}
            />
            <Dashbaord 
                setMapViewState={setMapViewState}
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
