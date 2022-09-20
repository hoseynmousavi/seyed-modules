import {useEffect, useState} from "react"

function GetCurrentLocation()
{
    const [location, setLocation] = useState(window.location.pathname)

    useEffect(() =>
    {
        function changeRoute()
        {
            setLocation(window.location.pathname)
        }

        window.addEventListener("popstate", changeRoute, {passive: true})
        window.addEventListener("pushstate", changeRoute, {passive: true})
        window.addEventListener("replacestate", changeRoute, {passive: true})

        return () =>
        {
            window.removeEventListener("popstate", changeRoute)
            window.removeEventListener("pushstate", changeRoute)
            window.removeEventListener("replacestate", changeRoute)
        }
    }, [])

    return {location}
}

export default GetCurrentLocation