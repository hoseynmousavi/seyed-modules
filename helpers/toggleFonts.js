function toggleFonts({language, changeVariables = []})
{
    if (language === "en")
    {
        changeVariables.forEach(item =>
        {
            document.documentElement.style.setProperty(
                item.replace(/REACT_APP_/g, "--").replace("_EN", "").replace(/_/g, "-").toLocaleLowerCase(),
                process.env[item],
            )
        })
    }
    else
    {
        changeVariables.forEach(item =>
        {
            document.documentElement.style.setProperty(
                item.replace(/REACT_APP_/g, "--").replace("_EN", "").replace(/_/g, "-").toLocaleLowerCase(),
                process.env[item.replace("_EN", "")],
            )
        })
    }
}

export default toggleFonts