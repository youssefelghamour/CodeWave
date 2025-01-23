import { initialStateUi } from "./uiReducer";
import { initialStateNotification } from "./notificationReducer";
import { Map } from "immutable";
import { rootReducer } from "./rootReducer";


describe('rootReducer', () => {
    it('returns the right state with the correct structure combining the states of the 3 reducers', () => {
        let expectedState = {
            courses: Map(),
            notifications: initialStateNotification,
            ui: initialStateUi,
        };

        expect(rootReducer(undefined, {})).toEqual(expectedState);
    });
});