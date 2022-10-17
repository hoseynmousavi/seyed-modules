import {createContext, useEffect, useReducer} from "react"
import {CHANGE_LANGUAGE} from "./LanguageTypes"
import cookieHelper from "../../../seyed-modules/helpers/cookieHelper"
import LanguageActions from "./LanguageActions"

export const LanguageContext = createContext(null)

function LanguageProvider({children, changeVariables, defaultLanguage = "fa"})
{
    const initialState = {
        language: defaultLanguage,
    }

    const [state, dispatch] = useReducer(reducer, initialState, init)

    function init()
    {
        return initialState
    }

    function reducer(state, action)
    {
        switch (action.type)
        {
            case CHANGE_LANGUAGE:
            {
                const {language} = action.payload
                return {
                    ...state,
                    language,
                }
            }
            default:
            {
                throw new Error()
            }
        }
    }

    useEffect(() =>
    {
        const language = cookieHelper.getItem("language")
        if (language && language !== defaultLanguage) LanguageActions.changeLanguage({language, changeVariables, dispatch})
        // eslint-disable-next-line
    }, [])

    return (
        <LanguageContext.Provider value={{state, dispatch}}>
            {children}
        </LanguageContext.Provider>
    )
}

export default LanguageProvider