import React from 'react';
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';
import { BASEMAP } from '@deck.gl/carto';
import { IconLayer } from '@deck.gl/layers';

// Viewport settings
const INITIAL_VIEW_STATE = {
    longitude: -105.086559,
    latitude: 40.573733,
    zoom: 13,
    pitch: 0,
    bearing: 0
};

const ICON_MAPPING = {
    marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
  };

export default function Main({data}) {

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
                getTooltip={({object}) => object && `${object.monitorId}\nAbsolute Sparsity Score: ${object.sparsityScore}`}
              >
                <StaticMap mapStyle={BASEMAP.POSITRON} />
            </DeckGL>
        </>
    );
}