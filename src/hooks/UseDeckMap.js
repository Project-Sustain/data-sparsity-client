import { useState, useEffect } from 'react';
import { GeoJsonLayer, IconLayer } from '@deck.gl/layers';
import { Api } from '../library/Api';
import { colors } from '../library/colors';
import chroma from 'chroma-js';

export function UseDeckMap(SparsityState, Request) {

    
    // Constants
    const countyColors = chroma.scale([colors.countyLight, colors.countyDark]).colors(15);
    const stateColors = chroma.scale([colors.state, colors.state]).colors(15);
    const ICON_MAPPING = { marker: { x: 0, y: 0, width: 128, height: 128, mask: true } };


    // State
    const [stateLayer, setStateLayer] = useState([]);
    const [countyLayer, setCountyLayer] = useState([]);
    const [iconLayer, setIconLayer] = useState([]);

    const [selectedShape, setSelectedShape] = useState({});
    const [selectedState, setSelectedState] = useState('');
    const [currentShapeName, setCurrentShapeName] = useState('Colorado');

    const [mapViewState, setMapViewState] = useState({
        longitude: -98.5795,
        latitude: 39.8283,
        zoom: 4.3,
        pitch: 30,
        bearing: 0
    });

    const [viewMapLegend, setViewMapLegend] = useState(false);


    // useEffects
    useEffect(() => {
        const layer = new IconLayer({
            id: 'icon-layer',
            pickable: true,
            data: SparsityState.sparsityData,
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
    }, [SparsityState.sparsityData]);

    useEffect(() => {
        if(Object.keys(selectedShape).length > 0) {
            Request.functions.setSpatialScope(selectedShape.gisjoin);
            setCurrentShapeName(selectedShape.name);
        }
    }, [selectedShape]);

    useEffect(() => {
        if(Request.state.stateOrCounty === 'COUNTY') {
            const setters = [setCountyLayer];
            const params = { 'collection': 'county_geo', 'state': selectedState };
            sendShapefileRequest(setters, params, setCountyLayer, countyColors, 'countylayer', handleCountyClick);
        }
        else {
          setCountyLayer([]);
        }
    }, [Request.state.stateOrCounty, selectedState]);
  
    useEffect(() => {
        const setters = [setStateLayer, setCountyLayer];
        const params = { 'collection': 'state_geo','state': '' }
        sendShapefileRequest(setters, params, setStateLayer, stateColors, 'statelayer', handleStateClick);
    }, []);

    // useEffect(() => {
    //     if(Request.state.requestStatus !== 'VALID') {
    //         setViewMapLegend(false);
    //     }
    // }, [Request.state.requestStatus]);


    // Functions
    const handleStateClick = (info, event) => {
        setSelectedState(info.object.name);
        setSelectedShape(info.object);
    };

    const handleCountyClick = (info, event) => {
        setSelectedShape(info.object);
    };

    let shapefileIterator;

    const sendShapefileRequest = async(layersToClear, params, layerToSet, colorMap, layerId, onShapeClick) => {
        layersToClear.forEach(setter => setter([]));
        const body = Api.getRequestBody(params);
        let reader;
        await fetch(Api.url+'shapefiles', body).then(response => {
            reader = response.body.getReader();
        });
        shapefileIterator = await Api.createIterator(reader, colorMap);
        const layer = getGeoJsonLayer(layerId, shapefileIterator, onShapeClick, 2);
        layerToSet([layer]);
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
        });
    };

    const getTooltip = ({object}) => {
        if(object && object.name) {
            return object && `${object.name}`;
        }
        else {
            return object && `Sparsity Score: ${object.sparsityScore}\nSite Mean: ${object.siteMean}\nNumber of Observations: ${object.numberOfMeasurements}`
        }
    };


    // Return Vals
    const state = { iconLayer, countyLayer, stateLayer, mapViewState, currentShapeName, viewMapLegend };

    const functions = {
        setMapViewState: (viewState) => setMapViewState(viewState),
        getTooltip: (object) => getTooltip(object),
        updateViewMapLegend: () => setViewMapLegend(!viewMapLegend)
    };


    // Return
    return { state, functions };

}