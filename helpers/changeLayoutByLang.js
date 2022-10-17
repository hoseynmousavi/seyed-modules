import cookieHelper from "./cookieHelper"
import fontReg from "../media/fonts/Poppins-Light.woff"
import fontMed from "../media/fonts/Poppins-SemiBold.woff"
import fontBold from "../media/fonts/Poppins-Bold.woff"
import toggleFonts from "./toggleFonts"

function changeLayoutByLang({language, changeVariables})
{
    const styleId = "lang-style"
    cookieHelper.setItem("language", language)

    document.documentElement.style.setProperty(
        "--language-direction",
        language === "en" ? "ltr" : "rtl",
    )

    toggleFonts({language, changeVariables})

    if (language === "en")
    {
        const newStyle = document.createElement("style")
        newStyle.id = styleId
        newStyle.appendChild(document.createTextNode(`
            @font-face {
                font-family: "my-font";
                src: url("${fontReg}") format("woff");
                font-display: swap;
            }
    
            @font-face {
                font-family: "my-font-demibold";
                src: url("${fontMed}") format("woff");
                font-display: swap;
            }

            @font-face {
                font-family: "my-font-bold";
                src: url("${fontBold}") format("woff");
                font-display: swap;
            }
            `))
        document.head.appendChild(newStyle)
    }
    else
    {
        document.getElementById(styleId).remove()
    }
}

export default changeLayoutByLang