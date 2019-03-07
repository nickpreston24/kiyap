import axios from "axios";

export default {

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