import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';
import { BASEMAP } from '@deck.gl/carto';
import { IconLayer } from '@deck.gl/layers';
import UseShapefileLoader from '../hooks/UseShapefileLoader';

// Viewport settings
const INITIAL_VIEW_STATE = {
    longitude: -98.5795,
    latitude: 39.8283,
    zoom: 4.3,
    pitch: 30,
    bearing: 0
};

const ICON_MAPPING = {
    marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
  };

export default function UsMap({data}) {
    const {stateLayer, countyLayer} = UseShapefileLoader();

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

    function getTooltip({object}) {
        return object && `${object.name}`;
    }

    return (
        <>
            <DeckGL
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}
                layers={[iconLayer, stateLayer, countyLayer]}
                getTooltip={getTooltip}
              >
                <StaticMap mapStyle={BASEMAP.POSITRON} />
            </DeckGL>
        </>
    );
}