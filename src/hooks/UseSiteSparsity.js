import { useState, useEffect } from "react";
import { colors } from "../library/colors";
import chroma from 'chroma-js';

export default function UseSiteSparsity() {


    // State
    const [sparsityData, setSparsityData] = useState([]);
    const [sparsityStats, setSparsityStats] = useState({});
    const [scores, setScores] = useState([]);
    const [colorGradient, setColorGradient] = useState([]);
    const [selectedScore, setSelectedScore] = useState(-1);
    const [lastHighlightedSite, setLastHighlightedSite] = useState({});
    const [numberOfResponses, setNumberOfResponses] = useState(0); // This informs useEffects when a new sparsity response has arrived


    // useEffects
    useEffect(() => {
        setLastHighlightedSite({});
    }, [numberOfResponses]);

    useEffect(() => {
        let tempScores = sparsityData.map((siteData) => {return siteData.sparsityScore});
        tempScores.sort();
        setScores(tempScores);
    }, [numberOfResponses]);

    useEffect(() => {
        const numberOfUniqueScores = new Set(scores).length;
        const tempGradient = chroma.scale([colors.tertiary, colors.primary]).colors(numberOfUniqueScores);
        setColorGradient(tempGradient);
    }, [scores]);


    // Functions
    const updateHighlightedSite = (index,) => {
        let data = [...sparsityData];
        if(Object.keys(lastHighlightedSite).length > 0) {
            data[lastHighlightedSite.index].color = lastHighlightedSite.color;
        }
        setLastHighlightedSite({
            'index': index,
            'color': data[index].color
        });
        data[index].color = [1, 255, 0];
        setSparsityData(data);
    };

    const deselectSite = () => {
        let data = [...sparsityData];
        data[lastHighlightedSite.index].color = lastHighlightedSite.color;
        setLastHighlightedSite({});
        setSparsityData(data);
    }


    // Return Vals
    const state = {
        sparsityData, sparsityStats, scores, colorGradient, selectedScore, lastHighlightedSite
    };

    const functions = {
        setSparsityData, setSparsityStats, setSelectedScore, updateHighlightedSite, deselectSite, setNumberOfResponses
    };


    // Return
    return { state, functions };

}