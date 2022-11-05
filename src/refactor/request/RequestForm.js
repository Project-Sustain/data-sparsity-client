import DashboardComponent from '../DashboardComponent';
import CollectionSelector from '../../components/request/CollectionSelecter';
import { Container, Grid, Button } from '@mui/material';
import BaselineRadios from '../../components/request/BaselineRadios';
import SpatialRadios from '../../components/request/SpatialRadios';


export default function RequestForm({Request, currentShapeName}) {


    return (
        <Container maxWidth='sm'>
            <DashboardComponent>
                <Grid 
                    container
                    spacing={2}
                    justifyContent='center'
                    alignItems='center'
                >
                    <Grid item xs={12}>
                        <CollectionSelector
                            collection={Request.state.collection}
                            setCollection={Request.functions.setCollection}
                            setBaseline={Request.functions.setBaseline}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <BaselineRadios
                            sendUpdateBaselineRequest={Request.functions.sendUpdateBaselineRequest}
                            baseline={Request.state.baseline}
                            setBaseline={Request.functions.setBaseline}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SpatialRadios
                            stateOrCounty={Request.state.stateOrCounty}
                            setStateOrCounty={Request.functions.setStateOrCounty}
                            currentShapeName={currentShapeName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant='outlined'
                            onClick={Request.functions.sendSparsityScoreRequest}
                        >
                            Submit Request
                        </Button>
                    </Grid>
                </Grid>
            </DashboardComponent>
        </Container>
    );


}