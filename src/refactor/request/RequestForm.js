import DashboardComponent from '../DashboardComponent';
import CollectionSelector from '../../components/request/CollectionSelecter';
import { Button } from '@mui/material';


export default function RequestForm({Request}) {

    return (
        <DashboardComponent>
            <CollectionSelector
                collection={Request.state.collection}
                setCollection={Request.functions.setCollection}
                setBaseline={Request.functions.setBaseline}
            />
            <Button
                variant='outlined'
                onClick={Request.functions.sendSparsityScoreRequest}
            >
                Submit Request
            </Button>
        </DashboardComponent>
    );

}