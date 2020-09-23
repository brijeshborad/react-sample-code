import {all, call, fork, put, takeEvery} from 'redux-saga/effects';
import {FORGOT_PASSWORD, LOGIN_USER, LOGOUT_USER, REGISTER_USER, RESET_PASSWORD,} from '../actions';

import {
    forgotPasswordError,
    forgotPasswordSuccess,
    loginUserError,
    loginUserSuccess,
    registerUserError,
    registerUserSuccess,
    resetPasswordError,
    resetPasswordSuccess
} from './actions';
import ApiService from "../../Services/ApiService";
import {setSessionCookie} from "../../Services/LocalstorageService";


export function* watchLoginUser() {
    yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

const loginWithEmailPasswordAsync = async (email, password) => {
    return await ApiService.callPost('v1/user/login', {email, password}, {'Skip-Headers': true});
};


function* loginWithEmailPassword({payload}) {
    const {email, password} = payload.user;
    const {history} = payload;
    try {
        const loginUser = yield call(loginWithEmailPasswordAsync, email, password);
        setSessionCookie(loginUser);
        yield put(loginUserSuccess(loginUser));
        history.push('/');
    } catch (error) {
        let err = error.response ? error.response.data.message : error.message
        yield put(loginUserError(err));

    }
}


export function* watchRegisterUser() {
    yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

const registerWithEmailPasswordAsync = async (email, password) => email;

function* registerWithEmailPassword({payload}) {
    const {email, password} = payload.user;
    const {history} = payload;
    try {
        const registerUser = yield call(registerWithEmailPasswordAsync, email, password);
        setSessionCookie(registerUser);
        yield put(registerUserSuccess(registerUser));
        history.push('/')
    } catch (error) {
        let err = error.response ? error.response.data.message : error.message
        yield put(registerUserError(err));
    }
}


export function* watchLogoutUser() {
    yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async (history) => {
    history.push('/')
};

function* logout({payload}) {
    const {history} = payload;
    try {
        localStorage.removeItem('session');
        yield call(logoutAsync, history);
    } catch (error) {
    }
}

export function* watchForgotPassword() {
    yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

const forgotPasswordAsync = async (email) => {
    return 'Forgot';
};

function* forgotPassword({payload}) {
    const {email} = payload.forgotUserMail;
    try {
        const forgotPasswordStatus = yield call(forgotPasswordAsync, email);
        if (!forgotPasswordStatus) {
            yield put(forgotPasswordSuccess("success"));
        } else {
            yield put(forgotPasswordError(forgotPasswordStatus.message));
        }
    } catch (error) {
        let err = error.response ? error.response.data.message : error.message
        yield put(forgotPasswordError(err));

    }
}

export function* watchResetPassword() {
    yield takeEvery(RESET_PASSWORD, resetPassword);
}

const resetPasswordAsync = async (resetPasswordCode, newPassword) => {
    return 'Confrirm';
};

function* resetPassword({payload}) {
    const {newPassword, resetPasswordCode} = payload;
    try {
        const resetPasswordStatus = yield call(resetPasswordAsync, resetPasswordCode, newPassword);
        if (!resetPasswordStatus) {
            yield put(resetPasswordSuccess("success"));
        } else {
            yield put(resetPasswordError(resetPasswordStatus.message));
        }
    } catch (error) {
        let err = error.response ? error.response.data.message : error.message
        yield put(resetPasswordError(err));

    }
}

export default function* rootSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchLogoutUser),
        fork(watchRegisterUser),
        fork(watchForgotPassword),
        fork(watchResetPassword),
    ]);
}
