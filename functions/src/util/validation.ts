export function isValidGuildID(num: any) {
    return (
        num !== null &&
        !isNaN(num)
        //TODO: Add more validation for snowflake IDs
    );
}

export function isValidPageNum(num: any) {
    return (
        num !== null &&
        !isNaN(num) &&
        num >= 0
    )
}