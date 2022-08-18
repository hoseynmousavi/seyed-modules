function makeBaseOnEnv(base)
{
    const {hostname} = window.location
    if (process.env.NODE_ENV === "development" || hostname.includes("dev")) return base.replace(".boomino.ir", "-dev.boomino.ir")
    else if (hostname.includes("uat")) return base.replace(".boomino.ir", "-uat.boomino.ir")
    else return base
}

export default makeBaseOnEnv