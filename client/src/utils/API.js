import axios from "axios";


export default {
  getNational: function() {
    return axios.get("/api/national");
  },
  
  saveLocation: function(saveData) {
    return axios.post("/api/national", saveData);
  }
};


