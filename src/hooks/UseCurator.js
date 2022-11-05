import { useState } from "react";


export function UseCurator() {


    // State
    const [viewRequestForm, setViewRequestForm] = useState(true);
    const [viewMapLegend, setViewMapLegend] = useState(false);


    // Functions
    const updateViewRequest = () => setViewRequestForm(!viewRequestForm)
    const updateViewMapLegend = () => setViewMapLegend(!viewMapLegend)


    // Return Vals
    const state = { viewRequestForm, viewMapLegend }

    const map = [
        { 'state': viewRequestForm, 'function': updateViewRequest, 'name': 'Request Form' },
        { 'state': viewMapLegend, 'function': updateViewMapLegend, 'name': 'Map Legend' },
    ]


    // Return
    return { state, map };


}