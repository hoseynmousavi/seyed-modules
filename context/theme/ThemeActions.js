import {TOGGLE_THEME} from "./ThemeTypes"

const changeTheme = ({theme, save, reset, dispatch}) =>
{
    dispatch({
        type: TOGGLE_THEME,
        payload: {theme, save, reset},
    })
}

const ThemeActions = {
    changeTheme,
}

export default ThemeActions