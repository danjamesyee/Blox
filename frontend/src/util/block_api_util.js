import axios from "axios";

export const getBlocks = () => {
  return axios.get("/api/blocks");
};

