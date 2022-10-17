import {useContext} from "react"
import {LanguageContext} from "../context/language/LanguageReducer"
import faTextConstant from "../../constant/faTextConstant"
import enTextConstant from "../../constant/enTextConstant"
import LanguageActions from "../context/language/LanguageActions"

function GetTextConstant()
{
    const {state: {language}, dispatch} = useContext(LanguageContext)
    const textConstant = language === "fa" ? faTextConstant : enTextConstant
    const direction = language === "fa" ? "rtl" : "ltr"

    function changeLang({language, changeVariables})
    {
        LanguageActions.changeLanguage({language, changeVariables, dispatch})
    }

    return {textConstant, language, direction, changeLang}
}

export default GetTextConstant