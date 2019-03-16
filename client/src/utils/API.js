import axios from "axios";

export default {


    /*Schools*/
    getSchools: function () {
        return axios.get("/api/schools");
    },

    getSchool: function (id) {
        return axios.get("/api/schools/" + id);
    },

    deleteSchool: function (id) {
        return axios.delete("/api/schools/" + id);
    },

    saveSchool: function (data) {
        console.log('school data: ', data)
        return axios.post("/api/schools", data);
    },


    /*Professionals*/
    getPros: function () {
        return axios.get("/api/pros");
    },

    getPro: function (id) {
        return axios.get("/api/pros/" + id);
    },

    deletePro: function (id) {
        return axios.delete("/api/pros/" + id);
    },

    savePro: function (data) {
        return axios.post("/api/pros", data);
    },

    /* Students */

    getStudents: function () {
        return axios.get("/api/students");
    },

    getStudent: function (id) {
        return axios.get("/api/students/" + id);
    },

    deleteStudent: function (id) {
        return axios.delete("/api/students/" + id);
    },

    saveStudent: function (data) {
        return axios.post("/api/students", data);
    }

};