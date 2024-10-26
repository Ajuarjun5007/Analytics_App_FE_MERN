import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/video-analytics'; 

const videoAnalyticsService = {
 
  getAllVideoAnalytics: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching video analytics:", error);
      throw error;
    }
  },

  getVideoAnalyticsById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching video analytics with ID ${id}:`, error);
      throw error;
    }
  },

  
  addVideoAnalytics: async (data) => {
    try {
      const response = await axios.post(BASE_URL, data);
      return response.data;
    } catch (error) {
      console.error("Error adding video analytics:", error);
      throw error;
    }
  },

  
  deleteVideoAnalyticsById: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting video analytics with ID ${id}:`, error);
      throw error;
    }
  }
};

export default videoAnalyticsService;
