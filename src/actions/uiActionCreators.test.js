import { displayNotificationDrawer, hideNotificationDrawer, login, loginRequest, logout } from "./uiActionCreators";
import { DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER, LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } from "./uiActionTypes";
import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import fetchMock from 'jest-fetch-mock';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('uiActionCreators', () => {
    let store;

    beforeEach(() => {
        store = mockStore({});
        fetchMock.enableMocks(); // Enable mocks for fetch
    });

    afterEach(() => {
        fetchMock.resetMocks(); // Reset mocks after each test
    });

    it('login action creator', () => {
        const result = {
            type: LOGIN,
            user: {
                email: 'example@email.com',
                password: 'password1',
            }
        };
        expect(login('example@email.com', 'password1')).toEqual(result);
    });

    it('logout action creator', () => {
        expect(logout()).toEqual({ type: LOGOUT });
    });

    it('displayNotificationDrawer action creator', () => {
        expect(displayNotificationDrawer()).toEqual({ type: DISPLAY_NOTIFICATION_DRAWER });
    });

    it('hideNotificationDrawer action creator', () => {
        expect(hideNotificationDrawer()).toEqual({ type: HIDE_NOTIFICATION_DRAWER });
    });

    it('should dispatch LOGIN and LOGIN_SUCCESS on successful API response', async () => {
        const email = 'email';
        const password = 'password';
        fetchMock.mockResponseOnce(JSON.stringify({ email: 'test@example.com' }));

        await store.dispatch(loginRequest(email, password));

        const actions = store.getActions();
        expect(actions).toEqual([
            { type: LOGIN, user: { email, password } },
            { type: LOGIN_SUCCESS },
        ]);
    });

    it('should dispatch LOGIN and LOGIN_FAILURE on API failure', async () => {
        const email = 'email';
        const password = 'password';
        fetchMock.mockRejectOnce(new Error('API failure'));

        await store.dispatch(loginRequest(email, password));

        const actions = store.getActions();
        expect(actions).toEqual([
            { type: LOGIN, user: { email, password } },
            { type: LOGIN_FAILURE },
        ]);
    });
});