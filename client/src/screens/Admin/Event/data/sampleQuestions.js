import moment from 'moment';

const getRandomDate = () => moment().add(Math.floor(Math.random() * 10), 'days');
const generateSampleQuestionList = size => {
  const list = [];
  for (let i = 0; i < size; i++) {
    list.push({
      id: i,
      content: 'This is a question',
      highlight: false,
      createdAt: getRandomDate().toISOString(),
      likes: [],
      dislikes: [],
      errors: null,
    })
  }
  return list;
}
export default generateSampleQuestionList(15);