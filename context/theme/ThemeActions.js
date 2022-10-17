import {TOGGLE_THEME} from "./ThemeTypes"
import themeManager from "../../helpers/themeManager"

const changeTheme = ({theme, save, changeVariables, dispatch}) =>
{
    dispatch({
        type: TOGGLE_THEME,
        payload: {theme, save, changeVariables},
    })
    themeManager.resetBarColor()
}

const ThemeActions = {
    changeTheme,
}

export default ThemeActions