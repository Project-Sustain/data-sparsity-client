import { useState } from "react";


export function UseCurator() {


    // State
    const [viewRequestForm, setViewRequestForm] = useState(true);
    const [viewMapLegend, setViewMapLegend] = useState(true);

    const [viewPieChart, setViewPieChart] = useState(true);
    const [viewBarChart, setViewBarChart] = useState(true);
    const [viewLineChart, setViewLineChart] = useState(true);
    const [viewSiteData, setViewSiteData] = useState(true);


    // Functions
    const updateViewRequest = () => setViewRequestForm(!viewRequestForm)
    const updateViewMapLegend = () => setViewMapLegend(!viewMapLegend)
    const updateViewPieChart = () => setViewPieChart(!viewPieChart)
    const updateViewBarChart = () => setViewBarChart(!viewBarChart)
    const updateViewLineChart = () => setViewLineChart(!viewLineChart)
    const updateViewSiteData = () => setViewSiteData(!viewSiteData)


    // Return Vals
    const state = { viewRequestForm, viewMapLegend, viewPieChart, viewBarChart, viewLineChart, viewSiteData }

    const functions = { updateViewRequest, updateViewMapLegend }

    const stateMap = [
        { 'state': viewRequestForm, 'function': updateViewRequest, 'name': 'Request Form' },
        { 'state': viewMapLegend, 'function': updateViewMapLegend, 'name': 'Map Legend' },
        { 'state': viewPieChart, 'function': updateViewPieChart, 'name': 'Pie Chart' },
        { 'state': viewBarChart, 'function': updateViewBarChart, 'name': 'Bar Chart' },
        { 'state': viewLineChart, 'function': updateViewLineChart, 'name': 'Line Chart' },
        { 'state': viewSiteData, 'function': updateViewSiteData, 'name': 'Site Data' },
    ]


    // Return
    return { state, functions, stateMap };


}