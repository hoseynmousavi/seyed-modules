function vibrate(pattern)
{
    if ("vibrate" in navigator)
    {
        try
        {
            navigator.vibrate(pattern)
        }
        catch (e)
        {
            console.log(e.message)
        }
    }
}

export default vibrate