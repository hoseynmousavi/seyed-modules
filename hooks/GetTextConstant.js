import {useContext} from "react"
import {LanguageContext} from "../context/language/LanguageReducer"
import faTextConstant from "../../constant/faTextConstant"
import enTextConstant from "../../constant/enTextConstant"

function GetTextConstant()
{
    const {state: {language}} = useContext(LanguageContext)
    const textConstant = language === "fa" ? faTextConstant : enTextConstant
    const direction = language === "fa" ? "rtl" : "ltr"
    return {textConstant, language, direction}
}

export default GetTextConstant