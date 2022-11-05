// Hooks
import { UseSiteSparsity } from './hooks/UseSiteSparsity';
import { UseRequest } from './hooks/UseRequest';
import { UseDeckMap } from './hooks/UseDeckMap';

// Components
import DeckMap from './refactor/map/DeckMap';
import RequestForm from './refactor/request/RequestForm';


export default function App() {


    const Sparsity = UseSiteSparsity();
    const Request = UseRequest(Sparsity.functions);
    const Map = UseDeckMap(Sparsity.state, Request);

    /**
     * Saturday 11/5
     * Add request form to map
     * Get request form working with hooks
     * Get icons on map for any state/county
     * 
     * Sunday 11/6
     * Add dashboard components
     */


    return (
        <>
            <DeckMap
                Map={Map}
            />
            <RequestForm
                Request={Request}
                currentShapeName={Map.state.currentShapeName}
            />
        </>
    );


}
