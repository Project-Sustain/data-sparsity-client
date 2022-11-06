import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';
import { BASEMAP } from '@deck.gl/carto';


export default function DeckMap({Map}) {

    return (
        <>
            <DeckGL
                viewState={Map.state.mapViewState}
                onViewStateChange={e => Map.functions.setMapViewState(e.viewState)}
                controller={true}
                layers={[Map.state.stateLayer, Map.state.countyLayer, Map.state.iconLayer]}
                getTooltip={Map.functions.getTooltip}
              >
                <StaticMap mapStyle={BASEMAP.POSITRON} />
            </DeckGL>
        </>
    );
}