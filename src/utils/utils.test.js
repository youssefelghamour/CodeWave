import { getFullYear, getFooterCopy, getLatestNotification } from "./utils";

describe("Get Full Year", () => {
    it("Should return the correct year", () => {
        expect(getFullYear()).toBe(new Date().getFullYear());
    });
})

describe("Get Footer Copy", () => {
    it("Should return the True footer", () => {
        expect(getFooterCopy(true)).toBe('Holberton School');
    });

    it("Should return the False footer", () => {
        expect(getFooterCopy(false)).toBe('Holberton School main dashboard');
    });
})

describe("Get Latest Notification", () => {
    it("Should return the correct string", () => {
        expect(getLatestNotification()).toBe('<strong>Urgent requirement</strong> - complete by EOD');
    });
})