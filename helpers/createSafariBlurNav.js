import createMaterialColor from "./createMaterialColor"
import checkOs from "./checkOs"

function createSafariBlurNav({color, variable, alpha = 0.82})
{
    const isApple = checkOs() === "mac" || checkOs() === "ios"
    return ({
        backgroundColor: createMaterialColor({color, variable, alpha: isApple ? alpha : 1}),
        backdropFilter: isApple ? "saturate(100%) blur(20px)" : "none",
    })
}

export default createSafariBlurNav