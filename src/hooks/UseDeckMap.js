import { useState, useEffect } from 'react';
import { GeoJsonLayer, IconLayer } from '@deck.gl/layers';
import { Api } from '../library/Api';
import { colors } from '../library/colors';
import chroma from 'chroma-js';

export default function UseDeckMap({sparsityData, setCurrentShapeName, setSpatialScope, stateOrCounty}) {

    // Constants
    const countyColors = chroma.scale([colors.countyLight, colors.countyDark]).colors(15);
    const stateColors = chroma.scale([colors.state, colors.state]).colors(15);
    const ICON_MAPPING = { marker: { x: 0, y: 0, width: 128, height: 128, mask: true } };


    // State
    const [stateLayer, setStateLayer] = useState([]);
    const [countyLayer, setCountyLayer] = useState([]);
    const [iconLayer, setIconLayer] = useState([]);

    const [selectedState, setSelectedState] = useState('');
    const [selectedShape, setSelectedShape] = useState({});


    // useEffects
    useEffect(() => {
        const layer = new IconLayer({
            id: 'icon-layer',
            pickable: true,
            sparsityData,
            iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
            iconMapping: ICON_MAPPING,
            sizeScale: 15,
            getIcon: d => 'marker',
            getPosition: d => d.coordinates,
            getSize: d => 2,
            getColor: d => d.color,
            getFillColor: d => d.color
        });
        setIconLayer([layer])
    }, [sparsityData]);

    useEffect(() => {
        if(Object.keys(selectedShape).length > 0) {
            setSpatialScope(selectedShape.gisjoin);
            setCurrentShapeName(selectedShape.name);
        }
    }, [selectedShape]);

    useEffect(() => {
        if(stateOrCounty === 'COUNTY') {
            sendCountyShapefileRequest(selectedState);
        }
        else {
          setCountyLayer([]);
        }
    }, [stateOrCounty, selectedState]);
  
    useEffect(() => {
        sendStateShapefileRequest();
    }, []);


    // Functions
    const handleStateClick = (info, event) => {
        setSelectedState(info.object.name);
        setSelectedShape(info.object);
    };

    const handleCountyClick = (info, event) => {
        setSelectedShape(info.object);
    };

    let stateAsyncIterator;
    let countyAsyncIterator;

    const sendStateShapefileRequest = async() => {
        setStateLayer([]);
        setCountyLayer([]);
        const params = {
            'collection': 'state_geo',
            'state': ''
        };
        const body = Api.getRequestBody(params);
        let reader;
        await fetch(Api.url+'shapefiles', body).then(response => {
            reader = response.body.getReader();
        });
        stateAsyncIterator = await Api.createIterator(reader, stateColors);
        const layer = getGeoJsonLayer('statelayer', stateAsyncIterator, handleStateClick, 2);
        setStateLayer([layer]);
    };

    const sendCountyShapefileRequest = async(stateName) => {
        setCountyLayer([]);
        const params = {
            'collection': 'county_geo',
            'state': stateName
        };
        const body = Api.getRequestBody(params);
        let reader;
        await fetch(Api.url+'shapefiles', body).then(response => {
            reader = response.body.getReader();
        });
        countyAsyncIterator = await Api.createIterator(reader, countyColors);
        const layer = getGeoJsonLayer('countylayer', countyAsyncIterator, handleCountyClick, 1);
        setCountyLayer([layer]);
    };

    const getGeoJsonLayer = (id, asyncIterator, onShapeClick, lineWidth) => {
        return new GeoJsonLayer({
            id: id, 
            data: asyncIterator, 
            pickable: true,
            filled: true, 
            opacity: 0.01, 
            getFillColor: d => d.color,
            getLineColor: [0, 0, 0],
            truelineWidthScale: 15,
            lineWidthMinPixels: lineWidth,
            getLineWidth: 1,
            onClick: onShapeClick
        })
    };

    function getTooltip({object}) {
        return object && `${object.name}`;
    };


    // Return Vals
    const state = {
        iconLayer, countyLayer, stateLayer
    };

    const functions = {
        handleStateClick, handleCountyClick, getTooltip
    };


    // Return
    return { state, functions };

}