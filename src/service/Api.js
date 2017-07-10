import fetch from 'unfetch';

export const GOOGLE_API_KEY = 'AIzaSyBUKlOUz_V_rzdNWOX4QUsBmUdlkDgYIBQ';
export const MEETUP_API_KEY = '7d3f76675a7d204167f7617123e7e';
const MEETUP_BASE_URL = 'https://api.meetup.com';

const meetupHeaders = new Headers();

meetupHeaders.append('Authorization', `bearer ${MEETUP_API_KEY}`)

export const fetchMeetups = () => (
  fetch(`${MEETUP_BASE_URL}/find/events?lat=48.8684921&long=2.3174882`, {
    headers: meetupHeaders,
    mode: 'no-cors',
  })
)
