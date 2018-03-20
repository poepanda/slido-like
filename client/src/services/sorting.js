import { SORT_BY } from './constants';
import moment from 'moment';

export const getSortList = (list, sortBy, withHighlight = false) => {
  let sorted = list;
  switch (sortBy) {
    case SORT_BY.recent: {
      sorted = sorted.sort((a, b) => moment(b.createdAt).diff(moment(a.createdAt)));
      break;
    }
    default: sorted = sorted.sort((a, b) => b.likes.length - a.likes.length);
  }
  // Sort one more time to move highlighted question to front
  if (withHighlight) {
    for (let i = 0, len = sorted.length; i < len; i++) {
      if (sorted[i].highlighted) {
        const highlightedItem  = {...sorted[i]};
        sorted.splice(i, i);
        sorted.shift(highlightedItem);
      }
    }
  }
  return sorted;
}