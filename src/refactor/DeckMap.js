import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';
import { BASEMAP } from '@deck.gl/carto';


export default function DeckMap({stateLayer, countyLayer, iconLayer, mapViewState, setMapViewState, getTooltip}) {

    return (
        <>
            <DeckGL
                viewState={mapViewState}
                onViewStateChange={e => setMapViewState(e.viewState)}
                controller={true}
                layers={[stateLayer, countyLayer, iconLayer]}
                getTooltip={getTooltip}
              >
                <StaticMap mapStyle={BASEMAP.POSITRON} />
            </DeckGL>
        </>
    );
}