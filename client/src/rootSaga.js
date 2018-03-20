import { all, fork } from 'redux-saga/effects';

import meSaga from 'app/data/me/saga';
import eventSaga from 'app/data/events/saga';
import AdminEventSaga from 'app/screens/Admin/Event/data/saga';

export default function* rootSaga() {
  yield all ([
    // Data saga
    fork(meSaga),
    fork(eventSaga),

    // Admin Saga
    fork(AdminEventSaga),
  ]);
}