export const actionTypes = {
  FETCH_MEETUPS: {
    REQUEST: 'FETCH_MEETUPS.REQUEST',
    ERROR: 'FETCH_MEETUPS.ERROR',
    SUCCESS: 'FETCH_MEETUPS.SUCCESS',
  },
};

const initialState = {
  meetup: [],
};

export const meetupReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MEETUPS.SUCCESS:
      return {
        ...state,
        ...action.meetups,
      };
    case actionTypes.FETCH_MEETUPS.ERROR:
      return initialState;
    default:
      return state;
  }
};
