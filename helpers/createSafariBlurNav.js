import createMaterialColor from "./createMaterialColor"
import checkOs from "./checkOs"

function createSafariBlurNav({color, variable, alpha = 0.85, blur = true})
{
    const isApple = checkOs() === "mac" || checkOs() === "ios"
    return ({
        backgroundColor: createMaterialColor({color, variable, alpha: isApple ? alpha : 1}),
        backdropFilter: isApple && blur ? "saturate(100%) blur(20px)" : "none",
        WebkitBackdropFilter: isApple && blur ? "saturate(100%) blur(20px)" : "none",
    })
}

export default createSafariBlurNav