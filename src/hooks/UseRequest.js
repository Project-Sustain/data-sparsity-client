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


    const sendSparsityStatRequest = () => {
        setRequestStatus('PENDING');

    }

    const sendSparsityScoreRequest = () => {
        setRequestStatus('PENDING');

    }


    const state = {
        requestParams, collection, temporalRange, baseline
    }

    const functions = {
        setCollection, setTemporalRange, setBaseline, sendSparsityStatRequest, sendSparsityScoreRequest
    }


    return { state, functions };

}