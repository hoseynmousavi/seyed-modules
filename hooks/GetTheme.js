import {useContext} from "react"
import {ThemeContext} from "../context/theme/ThemeReducer"
import ThemeActions from "../context/theme/ThemeActions"

function GetTheme()
{
    const {state: {theme}, dispatch} = useContext(ThemeContext)
    const isDark = theme === "dark"

    function changeTheme({theme, save, changeVariables})
    {
        ThemeActions.changeTheme({theme, save, changeVariables, dispatch})
    }

    return {isDark, changeTheme}
}

export default GetTheme