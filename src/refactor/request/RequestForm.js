import DashboardComponent from '../DashboardComponent';
import CollectionSelector from '../../components/request/CollectionSelecter';


export default function RequestForm({Request}) {

    return (
        <DashboardComponent>
            <CollectionSelector
                collection={Request.state.collection}
                setCollection={Request.functions.setCollection}
                setBaseline={Request.functions.setBaseline}
            />
        </DashboardComponent>
    );

}