export const SUCCESS_TOAST = "SUCCESS_TOAST"
export const INFO_TOAST = "INFO_TOAST"
export const FAIL_TOAST = "FAIL_TOAST"
export const TIMER_TOAST = 5
export const REQUEST_CANCEL = "REQUEST_CANCEL"
export const RequestQue = lang => lang === "fa" ?
    "شما آفلاین هستید! به محض آنلاین شدن درخواست شما ارسال می‌شود."
    :
    "You Are Offline, Your Request Will be Send Whenever You Get Online."
export const TokenExpired = lang => lang === "fa" ?
    "ورود شما منقضی شده است، دوباره وارد شوید."
    :
    "Your Token Has been Expired, Please Login Again."