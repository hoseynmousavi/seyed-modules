import {useMemo} from "react"
import Route from "./Route"
import Redirect from "./Redirect"

function PrivateRoute({user, redirectUrl, ifNotLogin, dontChange, path, render, ...props})
{
    return useMemo(() =>
    {
        if (ifNotLogin)
        {
            if (!user) return <Route path={path} render={render} {...props}/>
            else return <Redirect to={redirectUrl}/>
        }
        else
        {
            if (user) return <Route path={path} render={render} {...props}/>
            else
            {
                const {pathname} = window.location
                return <Redirect to={`${redirectUrl}${pathname !== "/" ? `?returnTo=${pathname}` : ""}`}/>
            }
        }
        // eslint-disable-next-line
    }, dontChange ? [] : [user])
}

export default PrivateRoute