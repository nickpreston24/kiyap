import React, {Component} from 'react'
import { withAuthorization } from '../Session'
import { MapWithASearchBox } from '../Maps';
import { SchoolSearch } from '../Professionals';
import { LocationStore } from '../Stores';
import { withFlexColumn, withFlexRow } from '../Flex';

const store = new LocationStore();
class HomePage extends Component{

    componentWillMount() {
        {/* {console.log('props:', props)} */}

        this.props.firebase.users().on('value', snapshot => {
            console.log(!!snapshot);
        })
        console.log('will mount()')
    }

    render() {
        return (
            <div>
                {/* {console.log('firebase: ', this.props.firebase.users())} */}
                <MapWithASearchBox store={store}/>
                <SchoolSearch store={store}/>
            </div>
        )
    }
}

// const HomePage = () => (
//     <div>
//         <MapWithASearchBox store={store}/>
//         <SchoolSearch store={store}/>
//     </div>
// );


const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);