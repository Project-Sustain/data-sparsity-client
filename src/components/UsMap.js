import React from 'react';
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';
import { BASEMAP } from '@deck.gl/carto';
import { GeoJsonLayer } from '@deck.gl/layers';
import { IconLayer } from '@deck.gl/layers';

// Viewport settings
const INITIAL_VIEW_STATE = {
    longitude: -105.086559,
    latitude: 40.573733,
    zoom: 13,
    pitch: 0,
    bearing: 0
};

// Data to be used by the LineLayer
// const data = [
//     {sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}
// ];

const ICON_MAPPING = {
    marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
  };

// DeckGL react component
export default function Main({data}) {

    console.log({data})

    // const geoJsonLayer = [
    //     new GeoJsonLayer({id: 'geolayer', data: data, filled: true,  getFillColor: [160, 160, 180, 200] }),
    // ];

    const iconLayer = new IconLayer({
        id: 'icon-layer',
        pickable: true,
        data,
        iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
        iconMapping: ICON_MAPPING,
        sizeScale: 15,
        getIcon: d => 'marker',
        getPosition: d => d.coordinates,
        getSize: d => 2,
        getColor: d => d.color,
        getFillColor: d => d.color
    });

    return (
        <>
            <DeckGL
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}
                layers={[iconLayer]}
                getTooltip={({object}) => object && `${object.organizationFormalName}\n${object.monitorId}\nAbsolute Sparsity Score: ${object.sparsityScore}\nRelative Sparsity Score: ${object.relativeSparsityScore}`}
              >
                <StaticMap mapStyle={BASEMAP.POSITRON} />
            </DeckGL>
        </>
    );
}