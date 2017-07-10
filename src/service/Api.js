import fetch from 'unfetch';

export const GOOGLE_API_KEY = 'AIzaSyBUKlOUz_V_rzdNWOX4QUsBmUdlkDgYIBQ';
export const MEETUP_API_KEY = '7d3f76675a7d204167f7617123e7e';
const MEETUP_BASE_URL = 'https://api.meetup.com';
const CORS_BRIDGE = 'http://cors-anywhere.herokuapp.com';

export const fetchMeetups = () => (
  fetch(`${CORS_BRIDGE}/${MEETUP_BASE_URL}/find/events?key=${MEETUP_API_KEY}&sign=true&lat=48.8684921&long=2.3174882`)
  .then(r => r.json())
);
