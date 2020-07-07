import { getBlocks } from "../util/block_api_util";

export const RECEIVE_BLOCKS = "RECEIVE_BLOCKS";

export const receiveBlocks = (blocks) => ({
  type: RECEIVE_BLOCKS,
  blocks,
});

export const fetchBlocks = () => (dispatch) => {
  return getBlocks()
    .then((blocks) => dispatch(receiveBlocks(blocks)))
    .catch((err) => console.log(err));
};


