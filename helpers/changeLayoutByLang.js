import cookieHelper from "./cookieHelper"
import fontReg from "../media/fonts/Roboto-Regular-webfont.woff"
import fontMed from "../media/fonts/Roboto-Medium-webfont.woff"

function changeLayoutByLang(language)
{
    const styleId = "lang-style"
    cookieHelper.setItem("language", language)
    document.body.classList.toggle("ltr", language === "en")

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
                src: url("${fontMed}") format("woff");
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