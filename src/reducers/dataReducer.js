import { SEARCH, POSTS, CONTENT_LOADING } from "../actions/types";
const initialState = {
  data: [
    {
      id: 26,
      type: "image",
      data: null,
      filename: "7642e82e-cd46-449f-9beb-c351bb21eccc",
      source: 1,
      createdAt: "2019-07-07T16:39:08.000Z",
      updatedAt: "2019-07-07T16:39:08.000Z"
    },
    {
      id: 26,
      type: "text",
      data: null,
      filename: "7642e82e-cd46-449f-9beb-c351bb21eccc",
      source: 1,
      createdAt: "2019-07-07T16:39:08.000Z",
      updatedAt: "2019-07-07T16:39:08.000Z"
    },
    {
      id: 26,
      type: "video",
      data: null,
      filename: "7642e82e-cd46-449f-9beb-c351bb21eccc",
      source: 1,
      createdAt: "2019-07-07T16:39:08.000Z",
      updatedAt: "2019-07-07T16:39:08.000Z"
    }
  ],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CONTENT_LOADING:
      return { ...state, loading: true };
    case SEARCH:
      return { ...state, loading: false, data: action.payload };
    case POSTS:
      return { ...state, loading: false, data: action.payload };
    default:
      return state;
  }
}
