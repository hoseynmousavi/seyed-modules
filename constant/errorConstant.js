import cookieHelper from "../helpers/cookieHelper"

function errorConstant(error)
{
    const language = cookieHelper.getItem("language") || "fa"
    const isEn = language === "en"
    return (
        error?.response?.data?.status
        ||
        error?.response?.data?.detail
        ||
        error?.response?.data?.message
        ||
        {
            "Network Error": isEn ? "An Error Occurred, Please Check Your Connection." : "خطایی رخ داد، اتصال اینترنت خود را بررسی کنید.",
        }
            [error?.message]
        ||
        (
            isEn ?
                "An Error Occurred, Please Retry Again."
                :
                "خطایی رخ داد؛ مجدداً تلاش کنید."
        )
    )
}

export default errorConstant