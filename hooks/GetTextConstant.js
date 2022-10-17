import {useContext} from "react"
import {LanguageContext} from "../context/language/LanguageReducer"
import faTextConstant from "../../constant/faTextConstant"
import enTextConstant from "../../constant/enTextConstant"
import enToastConstant from "../../constant/enToastConstant"
import faToastConstant from "../../constant/faToastConstant"
import LanguageActions from "../context/language/LanguageActions"

function GetTextConstant()
{
    const {state: {language}, dispatch} = useContext(LanguageContext)
    const textConstant = language === "fa" ? faTextConstant : enTextConstant
    const toastConstant = language === "fa" ? faToastConstant : enToastConstant
    const direction = language === "fa" ? "rtl" : "ltr"

    function changeLang({language})
    {
        LanguageActions.changeLanguage({language, dispatch})
    }

    return {textConstant, toastConstant, language, direction, changeLang}
}

export default GetTextConstant