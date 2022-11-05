import { useState } from "react";


export function UseCurator() {


    // State
    const [viewRequest, setViewRequest] = useState(true);
    const [viewMapLegend, setViewMapLegend] = useState(false);


    // Functions
    const updateViewRequest = () => setViewRequest(!viewRequest)
    const updateViewMapLegend = () => setViewMapLegend(!viewMapLegend)


    // Return Vals
    const state = [
        { 'state': viewRequest, 'function': updateViewRequest, 'name': 'Request Form' },
        { 'state': viewMapLegend, 'function': updateViewMapLegend, 'name': 'Map Legend' },
    ]


    // Return
    return { state };


}