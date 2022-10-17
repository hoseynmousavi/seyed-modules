import {TOGGLE_THEME} from "./ThemeTypes"

const changeTheme = ({theme, save, changeVariables, dispatch}) =>
{
    dispatch({
        type: TOGGLE_THEME,
        payload: {theme, save, changeVariables},
    })
}

const ThemeActions = {
    changeTheme,
}

export default ThemeActions