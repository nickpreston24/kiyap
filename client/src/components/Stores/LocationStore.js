import API from '../../utils/API';
import { toJS, decorate, observable, action } from 'mobx';

/**
 * Holds States for School Search components
 */
export default class LocationStore {

    constructor({studentId}) {
        this.studentId = studentId
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

        // let currentIds = this.locations.map(l=>l.place_id);
        // console.log('current location ids: ', currentIds);

        // // let filteredLocations = this.locations.filter(l=>l.place_id)
        // let newLocations = toJS(locations.filter(l=>!currentIds.includes(l.placed_id)));
        // console.log('new locations: ',  newLocations);
        // this.locations = [...newLocations];

        console.log('new locations: ',  locations);
        this.locations = [...locations];
    }

    removeLocation(id) {
        this.locations = this.locations.filter(l => l.place_id !== id);
    }

    removeSchool(id) {
        this.schools = this.schools.filter(s=>s._id!==id);
        API.deleteSchool(id)
            .catch(console.error);
    }

    // indicates user's interest in a school.
    // Professionals will be able to indicate their schools and 'put them on the map' for students to find.
    saveSchool(lid) {

        const schools = toJS(this.schools);
        // console.log('schools: ', schools)
        // console.log('new place: ', lid);
        // console.log('current school ids: ', schools.map(l=>l.placeId));
        // console.log('dup?', schools.some(school=>school.placeId === lid));

        if(schools.some(school=>school.placeId === lid))
            return;

        let location = this.locations.find(loc=>loc.place_id === lid);
        let {name, formatted_address: address, place_id} = location;
        let school = {placeId: lid, name, address, studentId: this.studentId};

        this.schools.push(school);
        console.log('saving school: ', school)

        API.saveSchool(school)
            .catch(console.error);
    }

    //Loads the User saved school data, if any
    loadSavedSchools() {
        console.log('loaded student id: ', this.studentId)

        API.getStudentSchools(this.studentId)
            .then(res => {
                let data = res.data;
                console.log('saved schools: ', data);
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
