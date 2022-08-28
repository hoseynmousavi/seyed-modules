import createMaterialColor from "./createMaterialColor"
import checkOs from "./checkOs"

function createSafariBlurNav({color, variable, alpha = 0.82})
{
    return createMaterialColor({color, variable, alpha: checkOs() === "mac" || checkOs() === "ios" ? alpha : 1})
}

export default createSafariBlurNav