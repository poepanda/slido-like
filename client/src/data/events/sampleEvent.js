import moment from 'moment';

const generateSampleEvent = questionListSize => {
  const event = {
    eventId: 123,
    code: 'C123',
    name: 'My event',
    from: moment().toISOString(),
    to: moment().add(5, 'days').toISOString(),
    questions: [],
  }
 
  return event;
}
export default generateSampleEvent(15);