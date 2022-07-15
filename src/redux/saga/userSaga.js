import { call, put, takeLatest } from '@redux-saga/core/effects';
import { TOKEN_KEY } from '~/app-configs';
import { REQUEST_STATE } from '~/app-configs';
import { apiProfile } from '~/app-data/auth';
import { apiLogin } from '~/app-data/auth';
import { apiUpdateInstitution } from '~/app-data/users';
import { CHECK_VALID_TOKEN_FAIL } from '~/redux/actions/user';
import { UPDATE_DOCUMENT_STORE_ADDRESS } from '~/redux/actions/user';
import { UPDATE_DOCUMENT_STORE_ADDRESS_FAIL } from '~/redux/actions/user';
import { CHECK_VALID_TOKEN } from '~/redux/actions/user';
import { CHECK_VALID_TOKEN_SUCCESS } from '~/redux/actions/user';
import { UPDATE_DOCUMENT_STORE_ADDRESS_SUCCESS } from '~/redux/actions/user';
import { LOGIN_SUCCESS } from '~/redux/actions/user';
import { LOGIN_FAIL } from '~/redux/actions/user';
import { LOGIN } from '~/redux/actions/user';

function* handleLogin({ type, payload }) {
    try {
        const response = yield call(apiLogin, payload);
        if (response.state === REQUEST_STATE.SUCCESS) {
            localStorage.setItem(TOKEN_KEY, response.data.accessToken);
            const profile = yield call(apiProfile);
            yield put(LOGIN_SUCCESS(profile.data));
        } else {
            yield put(LOGIN_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* updateDocumentStoreAddress({ type, payload }) {
    const { documentStoreAddress } = payload;
    try {
        const response = yield call(apiUpdateInstitution, { documentStoreAddress });
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(
                UPDATE_DOCUMENT_STORE_ADDRESS_SUCCESS({
                    data: documentStoreAddress,
                }),
            );
        } else {
            yield put(UPDATE_DOCUMENT_STORE_ADDRESS_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

function* checkValidToken({ type, payload }) {
    try {
        const response = yield call(apiProfile);
        if (response.state === REQUEST_STATE.SUCCESS) {
            yield put(
                CHECK_VALID_TOKEN_SUCCESS({
                    data: response?.data,
                }),
            );
        } else {
            localStorage.removeItem(TOKEN_KEY);
            yield put(CHECK_VALID_TOKEN_FAIL());
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

export default function* userSaga() {
    yield takeLatest(LOGIN().type, handleLogin);
    yield takeLatest(UPDATE_DOCUMENT_STORE_ADDRESS().type, updateDocumentStoreAddress);
    yield takeLatest(CHECK_VALID_TOKEN().type, checkValidToken);
}
