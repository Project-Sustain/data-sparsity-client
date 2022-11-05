import { useState } from "react";


export function UseCurator() {


    // State
    const [viewRequestForm, setViewRequestForm] = useState(true);
    const [viewMapLegend, setViewMapLegend] = useState(true);


    // Functions
    const updateViewRequest = () => setViewRequestForm(!viewRequestForm)
    const updateViewMapLegend = () => setViewMapLegend(!viewMapLegend)


    // Return Vals
    const state = { viewRequestForm, viewMapLegend }

    const functions = { updateViewRequest, updateViewMapLegend }

    const stateMap = [
        { 'state': viewRequestForm, 'function': updateViewRequest, 'name': 'Request Form' },
        { 'state': viewMapLegend, 'function': updateViewMapLegend, 'name': 'Map Legend' },
    ]


    // Return
    return { state, functions, stateMap };


}