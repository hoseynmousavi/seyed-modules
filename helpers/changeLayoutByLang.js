import cookieHelper from "./cookieHelper"
import fontReg from "../media/fonts/Poppins-regular.woff2"
import fontSemiBold from "../media/fonts/Poppins-semibold.woff2"
import fontBold from "../media/fonts/Poppins-bold.woff2"
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
                src: url("${fontReg}") format("woff2");
                font-display: swap;
            }
    
            @font-face {
                font-family: "my-font-demibold";
                src: url("${fontSemiBold}") format("woff2");
                font-display: swap;
            }

            @font-face {
                font-family: "my-font-bold";
                src: url("${fontBold}") format("woff2");
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