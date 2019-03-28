import API from '../../utils/API';
import { decorate, observable, action, computed } from 'mobx';

export default class LocationStore {

    constructor() {
        this.locations = [];
        this.schools = [];
        this.toggle = false;

        this.loadSavedSchools();
    }

    clear() {
        this.locations = [];
    }

    togglePanel() {
        this.toggle = !this.toggle
    }

    switchToResults() {
        this.toggle = false
    }

    addSchools (locations) {
        this.locations = [...locations];
    }

    removeLocation(id) {
        // let location = this.locations.find(loc=>loc.place_id===id);
        // console.log('removing location: ', id);
        this.locations = this.locations.filter(l=>l.place_id!==id);
        // this.locations.remove(this.locations.find(l=>l.place_id===id));
    }

    removeSchool(id) {
        // console.log('removing school from db: ', id);
        // console.log(this.schools)
        this.schools = this.schools.filter(s=>s._id!==id);
        API.deleteSchool(id)
            .catch(console.error);
    }

    // indicates user's interest in a school.
    // Professionals will be able to indicate their schools and 'put them on the map' for students to find.
    saveSchool(id) {
        // console.log('saving school...', id);
        let location = this.locations.find(loc=>loc.place_id===id);
        // console.log('saved school keys: ', Object.keys(location));
        // console.log('school: ', location.name);

        let {name, formatted_address: address, place_id} = location;
        let school = {name, address};
        this.schools.push(school);

        API.saveSchool(school)
            .catch(console.error);
    }

    //Loads the User saved school data, if any
    loadSavedSchools() {
        API.getSchools()
            .then(res => {
                let data = res.data;
                // console.log('saved schools: ', data);
                this.schools = data;
            })
            .catch(console.error);
    }
}

decorate(LocationStore, {
    locations: observable,
    schools: observable,
    toggle: observable,
    clear: action,
    addSchools: action,
    togglePanel: action.bound,
    switchToResults: action.bound,
})
