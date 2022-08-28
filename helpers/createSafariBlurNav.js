import createMaterialColor from "./createMaterialColor"
import isSafari from "./isSafari"

function createSafariBlurNav({color, variable, alpha = 0.82})
{
    return createMaterialColor({color, variable, alpha: isSafari() ? alpha : 1})
}

export default createSafariBlurNav