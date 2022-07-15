import { all, takeLatest } from 'redux-saga/effects';
import userSaga from './userSaga';

export default function* () {
    yield all([userSaga()]);
}
