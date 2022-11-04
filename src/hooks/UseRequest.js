import { useState, useEffect } from "react";
import { sparsityMetadata } from "../library/metadata";
import { Api } from "../library/Api";

export default function UseRequest({setSparsityData, setSparsityStats, spatialScope, setRequestStatus}) {


    const [collection, setCollection] = useState(sparsityMetadata[0]);
    const [temporalRange, setTemporalRange] = useState([]);
    const [baseline, setBaseline] = useState(sparsityMetadata[0].initialBaseline);
    const [requestParams, setRequestParams] = useState({});


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
        }
        
        else {
            props.setStats({});
            console.log("ERROR in response");
        }

    }

    const sendUpdateBaselineRequest = async() => {
        Api.sendBaselineRequest(baseline, setRequestStatus, setSparsityData, null);
    }


    const state = {
        requestParams, collection, temporalRange, baseline
    }

    const functions = {
        setCollection, setTemporalRange, setBaseline, sendSparsityStatRequest, sendSparsityScoreRequest
    }


    return { state, functions };

}