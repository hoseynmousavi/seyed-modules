import {CHANGE_LANGUAGE} from "./LanguageTypes"

function changeLanguage({language, dispatch})
{
    dispatch({
        type: CHANGE_LANGUAGE,
        payload: {language},
    })
}

const LanguageActions = {
    changeLanguage,
}

export default LanguageActions