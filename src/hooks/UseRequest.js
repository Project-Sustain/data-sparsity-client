import { useState, useEffect } from "react";
import { sparsityMetadata } from "../library/metadata";
import { Api } from "../library/Api";

export function UseRequest(setSparsityData, setSparsityStats, spatialScope, setRequestStatus, incrementNumberOfResponses) {
// export function UseRequest(props) {

    /**
     * Working on fixing incoming args to this hook. Try {} around call in Main.js? Then don't need props?
     */
    console.log({setSparsityData})

    // State
    const [collection, setCollection] = useState(sparsityMetadata[0]);
    const [temporalRange, setTemporalRange] = useState([]);
    const [baseline, setBaseline] = useState(sparsityMetadata[0].initialBaseline);
    const [requestParams, setRequestParams] = useState({});


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
            setSparsityStats({
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

            Api.sendBaselineRequest(baseline, setRequestStatus, setSparsityData, null);
            incrementNumberOfResponses();
        }
        
        else {
            setSparsityStats({});
            console.log("ERROR in response");
        }

    }

    const sendUpdateBaselineRequest = async() => {
        Api.sendBaselineRequest(baseline, setRequestStatus, setSparsityData, null);
        incrementNumberOfResponses();
    }


    // Return Vals
    const state = { requestParams, collection }

    const functions = {
        setCollection: (collection) => setCollection(collection), 
        setTemporalRange: (range) => setTemporalRange(range), 
        setBaseline: baseline => setBaseline(baseline), 
        sendUpdateBaselineRequest: () => sendUpdateBaselineRequest(), 
        sendSparsityScoreRequest: () => sendSparsityScoreRequest()
    }


    // Return
    return { state, functions };

}