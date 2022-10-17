import {TOGGLE_THEME} from "./ThemeTypes"

const changeTheme = ({theme, save, dispatch}) =>
{
    dispatch({
        type: TOGGLE_THEME,
        payload: {theme, save},
    })
}

const ThemeActions = {
    changeTheme,
}

export default ThemeActions