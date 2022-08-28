import createMaterialColor from "../seyed-modules/helpers/createMaterialColor"
import isSafari from "../seyed-modules/helpers/isSafari"

function createSafariBlurNav({color, variable, alpha = 0.82})
{
    return createMaterialColor({color, variable, alpha: isSafari() ? alpha : 1})
}

export default createSafariBlurNav