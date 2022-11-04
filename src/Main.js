import { useState } from 'react'

// Hooks
import { UseSiteSparsity } from './hooks/UseSiteSparsity';
import { UseRequest } from './hooks/UseRequest';
import { UseDeckMap } from './hooks/UseDeckMap';

// Components
import Dashbaord from './components/Dashboard';
import UsMap from './components/UsMap';
import { Button } from '@mui/material';


export default function App() {

    // OLD
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [sparsityData, setSparsityData] = useState([]);
    const [shapefileCollection, setShapefileCollection] = useState('STATE');
    const [gisjoin, setGisjoin] = useState('G080');


    // NEW
    const [mapViewState, setMapViewState] = useState({
        longitude: -98.5795,
        latitude: 39.8283,
        zoom: 4.3,
        pitch: 30,
        bearing: 0
    });
    const [ currentShapeName, setCurrentShapeName ] = useState('Colorado');
    const [ stateOrCounty, setStateOrCounty ] = useState('STATE');
    const [ spatialScope, setSpatialScope ] = useState('G080');
    const [ requestStatus, setRequestStatus ] = useState('NO REQUEST');

    const Sparsity = UseSiteSparsity();
    const Request = UseRequest(Sparsity.functions.setSparsityData, Sparsity.functions.setSparsityStats, spatialScope, setRequestStatus, Sparsity.functions.incrementNumberOfResponses);
    const Map = UseDeckMap(Sparsity.state.sparsityData, setCurrentShapeName, setSpatialScope, stateOrCounty);
    console.log({Sparsity})
    console.log({Request})
    console.log({Map})

    return (
        <>
            <Button variant='outlined' onClick={Request.functions.sendSparsityScoreRequest}>Test Request</Button>
            {/* <UsMap 
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
            /> */}
        </>
    );
}
