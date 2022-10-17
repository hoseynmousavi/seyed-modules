function toggleTheme({theme, changeVariables})
{
    if (theme === "dark")
    {
        changeVariables.forEach(item =>
        {
            document.documentElement.style.setProperty(
                item.replace(/REACT_APP_/g, "--").replace("_DARK", "").replace(/_/g, "-").toLocaleLowerCase(),
                process.env[item],
            )
        })
    }
    else
    {
        changeVariables.forEach(item =>
        {
            document.documentElement.style.setProperty(
                item.replace(/REACT_APP_/g, "--").replace("_DARK", "").replace(/_/g, "-").toLocaleLowerCase(),
                process.env[item.replace("_DARK", "")],
            )
        })
    }
}

export default toggleTheme