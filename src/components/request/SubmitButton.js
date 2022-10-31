import { Button } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import { Api } from '../../helpers/api';

const useStyles = makeStyles({
    root: {
        width: '100%'
    }
});

export default function SubmitButton(props) {
    const classes = useStyles();

    const sendSparsityScoreRequest = async() => {

        props.setSparsityData([]);
        props.setStatus("PENDING");
        props.setStats({});

        const params = {
            'collectionName': props.collection.collection,
            'spatialIdentifier': props.gisjoin,
            'startTime': props.startTime,
            'endTime': props.endTime,
            'siteIdName': props.collection.siteIdName,
            'siteCollection': props.collection.siteCollection,
            'measurementTypes': props.measurementTypes,
            'sitePropertyFields': props.collection.sitePropertyFields,
            'baseline': props.baseline
        };

        const response = await Api.sendJsonRequest("sparsityScores", params);
        if(response) {
            props.setStats({
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

            Api.sendBaselineRequest(props.baseline, props.setStatus, props.setSparsityData, props.setRequest);
        
        }

        else {
            props.setStats({});
            console.log("ERROR in response");
        }

    }

    return <Button className={classes.root} variant='outlined' onClick={sendSparsityScoreRequest}>Submit Request</Button>
}