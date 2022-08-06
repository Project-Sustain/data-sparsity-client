import { Button } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import { colors } from '../../helpers/colors';
import chroma from 'chroma-js';

const useStyles = makeStyles({
    root: {
        width: '100%'
    }
});

export default function SubmitButton(props) {
    const classes = useStyles();

    const sendSparsityScoreRequest = async() => {

        props.setStatus("PENDING");
        props.setSparsityData([]);

        const params = {
            'collectionName': props.collectionName,
            'spatialScope': props.spatialScope,
            'spatialIdentifier': props.spatialIdentifier,
            'startTime': props.startTime,
            'endTime': props.endTime,
            'measurementTypes': props.measurementTypes
        };

        const body = {
            'method':'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(params)
        };

        const url = "http://127.0.0.1:5000/sparsityScores";

        let streamedResults = [];

        fetch(url, body).then(async stream => {
            let reader = stream.body.getReader();
            let incompleteResponse  = "";
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    const formattedResults = formatResults(streamedResults);
                    props.setSparsityData(formattedResults);
                    props.setSelectedIndex(0);
                    props.setStatus(formattedResults.length > 0 ? "VALID" : "INVALID");
                    break;
                }
                else {
                    try {
                        let response = new TextDecoder().decode(value);
                        response = incompleteResponse + response;
                        while(response.indexOf('\n') !== -1) {
                            const parsedResponse = response.substring(0, response.indexOf('\n'));
                            const obj = JSON.parse(parsedResponse);
                            response = response.substring(response.indexOf('\n') + 1, response.length);
                            obj.sparsityScore = obj.sparsityScore ? parseFloat((obj.sparsityScore).toFixed(3)) : 0;
                            streamedResults.push(obj);
                        }
                        if(response.indexOf('\n') === -1 && response.length !== 0){
                            incompleteResponse = response;
                        }
                        else{
                            incompleteResponse = "";
                        }
                    } catch(err){
                        console.log("Error while streaming "+ err);
                    }
                }
            }

            function formatResults(streamedResults) {
                streamedResults.sort((a, b) => {return b.sparsityScore - a.sparsityScore});
                const scoresList = [...new Set(streamedResults.map(result => {return result.sparsityScore}))];
                const initialColorScale = chroma.scale([colors.tertiary, colors.primary]).colors(streamedResults.length);
                const numberOfUniqueScores = scoresList.length - 1;
                const scoreMap = {};
                scoresList.forEach((absoulteScore, index) => {
                    scoreMap[absoulteScore] = parseInt(((numberOfUniqueScores - index) / numberOfUniqueScores) * 100) + "%";
                });
                const formattedResults = streamedResults.map((result, index) => {
                    const coordinates = result.coordinates;
                    result.coordinates = [coordinates.longitude, coordinates.latitude];
                    result.relativeSparsityScore = scoreMap[result.sparsityScore];
                    result.color = hexToRgb(initialColorScale[index]);
                    return result
                });
                return formattedResults;

                // Source: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
                function hexToRgb(hex) {
                    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [0, 0 ,0];
                  }
            }
        });
    }

    return <Button className={classes.root} variant='outlined' onClick={sendSparsityScoreRequest}>Submit Request</Button>
}