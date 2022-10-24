import { useState, useEffect } from 'react';
import { Api } from '../helpers/api';

export default function UseConnectionStatus() {
    const [serverConnection, setServerConnection] = useState(false);
    const [DbConnection, setDbConnection] = useState(false);

    const [trigger, setTrigger] = useState(true);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setTrigger(!trigger);
    //     }, 15000);
    // });

    useEffect(() => {
        (async () => {
            const response = await Api.sendRequest("serverConnection");
            if(response) {
                setServerConnection(response);
            }
            else console.log("ERROR sending serverConnection request");
        })();
    }, [trigger]);

    useEffect(() => {
        (async () => {
            const response = await Api.sendRequest("dbConnection");
            if(response) {
                setDbConnection(response);
            }
            else console.log("ERROR sending dbConnection request");
        })();
    }, [trigger]);

    return { serverConnection, DbConnection };
}