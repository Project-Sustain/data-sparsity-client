import { useState, useEffect } from "react";
import { sparsityMetadata } from "../library/metadata";
import { Api } from "../library/Api";

export function UseRequest(SparsityFunctions) {

    
    // State
    const [collection, setCollection] = useState(sparsityMetadata[0]);
    const [temporalRange, setTemporalRange] = useState([]);
    const [baseline, setBaseline] = useState(sparsityMetadata[0].initialBaseline);
    const [spatialScope, setSpatialScope] = useState('G0800690');
    const [requestParams, setRequestParams] = useState({});

    const [stateOrCounty, setStateOrCounty] = useState('COUNTY');
    const [requestStatus, setRequestStatus] = useState('NO REQUEST');


    // useEffects
    useEffect(() => {
        setRequestParams({
            'collectionName': collection.collection,
            'spatialIdentifier': spatialScope,
            'startTime': temporalRange[0],
            'endTime': temporalRange[1],
            'siteIdName': collection.siteIdName,
            'siteCollection': collection.siteCollection,
            'measurementTypes': [],
            'sitePropertyFields': collection.sitePropertyFields,
            'baseline': baseline
        });
    }, [collection, temporalRange, baseline, spatialScope]);

    useEffect(() => {
        (async () => {
            const response = await Api.sendJsonRequest("temporalRange", {'collectionName': collection.collection});
            if(response) {
                setTemporalRange([parseInt(response.firstTime), parseInt(response.lastTime)]);
            }
            else console.log("ERROR sending temporalRange request");
        })();
    }, [collection]);


    // Functions
    const sendSparsityScoreRequest = async() => {
        setRequestStatus('PENDING');
        const response = await Api.sendJsonRequest("sparsityScores", requestParams);
        if(response) {
            SparsityFunctions.setSparsityStats({
                'minTimeBetweenObservations': response.diffStats[0],
                'maxTimeBetweenObservations': response.diffStats[1],
                'meanTimeBetweenObservations': response.diffStats[2],
                'stdDevTimeBetweenObservations': response.diffStats[3],

                'minNumberOfObservations': response.obsStats[0],
                'maxNumberOfObservations': response.obsStats[1],
                'meanNumberOfObservations': response.obsStats[2],
                'stdDevNumberOfObservations': response.obsStats[3],

                'minSparsity': response.sparsityStats[0],
                'maxSparsity': response.sparsityStats[1],
                'meanSparsity': response.sparsityStats[2] ? response.sparsityStats[2] : 0.0,
                'stdDevSparsity': response.sparsityStats[3]
            });

            Api.sendBaselineRequest(baseline, setRequestStatus, SparsityFunctions.setSparsityData, SparsityFunctions.incrementNumberOfResponses);
        }
        
        else {
            SparsityFunctions.setSparsityStats({});
            console.log("ERROR in response");
        }

    }

    const sendUpdateBaselineRequest = async() => {
        Api.sendBaselineRequest(baseline, setRequestStatus, SparsityFunctions.setSparsityData, SparsityFunctions.incrementNumberOfResponses, spatialScope, requestStatus);
    }


    // Return Vals
    const state = { requestParams, collection, spatialScope, requestStatus, stateOrCounty, baseline }

    const functions = {
        setCollection: (collection) => setCollection(collection), 
        setTemporalRange: (range) => setTemporalRange(range), 
        setBaseline: (baseline) => setBaseline(baseline), 
        setSpatialScope: (scope) => setSpatialScope(scope),
        setRequestStatus: (status) => setRequestStatus(status),
        setStateOrCounty: (value) => setStateOrCounty(value),
        sendUpdateBaselineRequest: () => sendUpdateBaselineRequest(), 
        sendSparsityScoreRequest: () => sendSparsityScoreRequest()
    }


    // Return
    return { state, functions };

}