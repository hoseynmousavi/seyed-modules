import {CHANGE_LANGUAGE} from "./LanguageTypes"
import changeLayoutByLang from "../../helpers/changeLayoutByLang"

function changeLanguage({language, changeVariables, dispatch})
{
    changeLayoutByLang({language, changeVariables})
    dispatch({
        type: CHANGE_LANGUAGE,
        payload: {language},
    })
}

const LanguageActions = {
    changeLanguage,
}

export default LanguageActions