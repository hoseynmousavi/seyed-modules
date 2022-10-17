import {CHANGE_LANGUAGE} from "./LanguageTypes"

function changeLanguage({language, changeVariables, dispatch})
{
    dispatch({
        type: CHANGE_LANGUAGE,
        payload: {language, changeVariables},
    })
}

const LanguageActions = {
    changeLanguage,
}

export default LanguageActions