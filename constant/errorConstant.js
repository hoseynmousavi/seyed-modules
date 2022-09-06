function errorConstant(error)
{
    return (
        error?.response?.data?.status
        ||
        error?.response?.data?.detail
        ||
        error?.response?.data?.message
        ||
        {
            "Network Error": "خطایی رخ داد، اتصال اینترنت خود را بررسی کنید.",
        }
            [error?.message]
        ||
        "خطایی رخ داد؛ مجدداً تلاش کنید."
    )
}

export default errorConstant