import cookieHelper from "../helpers/cookieHelper"

function errorConstant(error)
{
    const language = cookieHelper.getItem("language") || "fa"
    const isEn = language === "en"
    return (
        error?.response?.data?.error?.toString?.()
        ||
        error?.response?.data?.status?.toString?.()
        ||
        error?.response?.data?.detail?.toString?.()
        ||
        error?.response?.data?.message?.toString?.()
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