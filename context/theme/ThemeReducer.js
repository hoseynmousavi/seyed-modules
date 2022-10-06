import {createContext, useEffect, useReducer} from "react"
import {TOGGLE_THEME} from "./ThemeTypes"
import ThemeActions from "./ThemeActions"
import loadColors from "../../helpers/loadColors"
import themeManager from "../../helpers/themeManager"
import setCssVariables from "../../helpers/setCssVariables"
import cookieHelper from "../../helpers/cookieHelper"
import checkOs from "../../helpers/checkOs"

export const ThemeContext = createContext(null)

const initialState = {
    theme: "light",
}

const init = () => initialState

function reducer(state, action)
{
    switch (action.type)
    {
        case TOGGLE_THEME:
        {
            const {theme, save} = action.payload
            if (save) cookieHelper.setItem("theme", theme === "dark" ? "dark" : "light")
            return {
                ...state,
                theme,
            }
        }
        default:
        {
            throw new Error()
        }
    }
}

function ThemeProvider({children, changeVariables})
{
    const [state, dispatch] = useReducer(reducer, initialState, init)

    useEffect(() =>
    {
        if (process.env.NODE_ENV === "development") loadColors()
        setCssVariables()
        if (checkOs() === "ios") document.getElementById("root").className = "ios"
        themeManager.configTheme()
        const defaultDark = window?.matchMedia("(prefers-color-scheme: dark)")
        const theme = cookieHelper.getItem("theme")
        if (theme === "dark" || (!theme && defaultDark?.matches)) ThemeActions.changeTheme({theme: "dark", save: false, changeVariables, dispatch})
        defaultDark.addEventListener("change", () =>
            ThemeActions.changeTheme({theme: defaultDark?.matches ? "dark" : "light", save: true, changeVariables, dispatch}),
        )
        // eslint-disable-next-line
    }, [])

    return (
        <ThemeContext.Provider value={{state, dispatch}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider