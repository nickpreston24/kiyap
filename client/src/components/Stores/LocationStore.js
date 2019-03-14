import API from '../../utils/API';
import { decorate, observable, action, computed } from 'mobx';

export default class LocationStore {
    constructor() {
        this.locations = [];
        this.loadSchools();
    }
    clear() {
        this.locations = [];
    }
    addLocation (location){
        this.locations.push(location)
    }
    upvote(location) {
        // TODO: 'Upvote' indicates user's interest in a school.
        // Professionals will be able to indicate their schools and 'put them on the map' for students to find.
    }
    //Loads the User saved school data, if any
    loadSchools() {
        API.getSchools()
            .then(res => {
                let data = res.data;
                console.log('saved schools: ', data);
                this.locations = data;
            })
            .catch(err => console.log(err));
    }
}

decorate(LocationStore, {
    locations: observable,
    clear: action,
    addLocation: action,
})
