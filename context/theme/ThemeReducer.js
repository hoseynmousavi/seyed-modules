import {createContext, useEffect, useReducer} from "react"
import {TOGGLE_THEME} from "./ThemeTypes"
import ThemeActions from "./ThemeActions"
import loadColors from "../../helpers/loadColors"
import themeManager from "../../helpers/themeManager"
import setCssVariables from "../../helpers/setCssVariables"
import cookieHelper from "../../helpers/cookieHelper"
import checkOs from "../../helpers/checkOs"
import toggleTheme from "../../helpers/toggleTheme"

export const ThemeContext = createContext(null)

function ThemeProvider({children, changeVariables})
{
    const initialState = {
        theme: "light",
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
            case TOGGLE_THEME:
            {
                const {theme, save, changeVariables} = action.payload
                toggleTheme({theme, changeVariables})
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