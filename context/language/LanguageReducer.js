import {createContext, useEffect, useReducer} from "react"
import {CHANGE_LANGUAGE} from "./LanguageTypes"
import cookieHelper from "../../../seyed-modules/helpers/cookieHelper"
import LanguageActions from "./LanguageActions"
import changeLayoutByLang from "../../helpers/changeLayoutByLang"

export const LanguageContext = createContext(null)

const initialState = {
    language: "fa",
}

const init = () => initialState

function reducer(state, action)
{
    switch (action.type)
    {
        case CHANGE_LANGUAGE:
        {
            const {language, changeVariables} = action.payload
            changeLayoutByLang({language, changeVariables})
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

function LanguageProvider({children, changeVariables})
{
    const [state, dispatch] = useReducer(reducer, initialState, init)

    useEffect(() =>
    {
        const language = cookieHelper.getItem("language")
        if (language && language !== "fa") LanguageActions.changeLanguage({language, changeVariables, dispatch})
        // eslint-disable-next-line
    }, [])

    return (
        <LanguageContext.Provider value={{state, dispatch}}>
            {children}
        </LanguageContext.Provider>
    )
}

export default LanguageProvider