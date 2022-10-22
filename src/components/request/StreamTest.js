import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { Button } from '@mui/material';
import { sendJsonRequest } from '../../helpers/api';

const useStyles = makeStyles({
    root: {
        margin: '10px',
        width: '100%'
    }
});

export default function StreamTest(props) {
    const classes = useStyles();

    const sendShapefileRequest = async() => {

        const params = {
            'collection': 'state_geo',
            'stateFP': 'county_geo',
        };

        const body = {
            'method':'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(params)
        };

        const url = "http://127.0.0.1:5000/shapefiles";

        let streamedResults = [];

        fetch(url, body).then(async stream => {
            let reader = stream.body.getReader();
            let incompleteResponse  = "";
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    console.log("Done Streaming.");
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
                            console.log({obj});
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

        });

    }

    return <Button onClick={sendShapefileRequest} className={classes.root} variant='outlined'>Stream Shapefiles</Button>
}