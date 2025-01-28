export function getFullYear() {
    return new Date().getFullYear();
}

export const getFooterCopy = (isIndex) => {
    return isIndex ? "CodeWave School" : "CodeWave School main dashboard";
}

export function getLatestNotification() {
    return (
        '<strong>Urgent requirement</strong> - complete by EOD'
    );
}