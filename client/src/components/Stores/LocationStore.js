import API from '../../utils/API';
import { decorate, observable, action, computed } from 'mobx';

export default class LocationStore {

    constructor() {
        this.locations = [];
        this.professionals = [];
        this.schools = [];

        this.loadSavedSchools();
        // this.loadProfessionals();
    }

    clear() {
        this.locations = [];
    }


    addSchools (locations) {
        this.locations = [...locations];
    }

    // getLocations () {
    //     return this.locations;
    // }

    // indicates user's interest in a school.
    // Professionals will be able to indicate their schools and 'put them on the map' for students to find.
    saveSchool(school) {
        this.schools.push(school)
    }

    //Loads the User saved school data, if any
    loadSavedSchools() {
        API.getSchools()
            .then(res => {
                let data = res.data;
                // console.log('saved schools: ', data);
                this.schools = data;
            })
            .catch(err => console.log(err));
    }

    // loadProfessionals(){
    //     API.getPros()
    //         .then(res => {
    //             let data = res.data;
    //             console.log('saved schools: ', data);
    //             this.locations = data;
    //         })
    //         .catch(err => console.log(err));
    // }
}

decorate(LocationStore, {
    locations: observable,
    schools: observable,
    clear: action,
    addSchools: action,
})
