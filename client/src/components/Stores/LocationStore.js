import API from '../../utils/API';
import { decorate, observable, action } from 'mobx';

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
        // console.log('locations found:', locations)
        // console.log('photos', locations.map(l=>l.photos))
        // console.log('rating', locations.map(l=>l.rating))
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
    saveSchool(id) {

        let location = this.locations.find(loc=>loc.place_id === id);
        let {name, formatted_address: address, place_id} = location;
        let school = {name, address, studentId: this.studentId};

        this.schools.push(school);
        console.log('saving school: ', school)

        API.saveSchool(school)
            .catch(console.error);
    }

    //Loads the User saved school data, if any
    loadSavedSchools() {
        // console.log('loaded student id: ', this.studentId)

        API.getStudentSchools(this.studentId)
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
