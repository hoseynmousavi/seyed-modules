import {memo} from "react"
import Material from "./Material"
import MyLoader from "./MyLoader"

function Button({type = "first", className, style, loading, disable, onClick, onDisableClick, children, backgroundColor, loaderWidth = 25})
{
    return (
        <Material className={`button ${type} ${className} ${loading ? "loading" : ""} ${disable ? "disable" : "active"}`} style={style} disable={disable || loading} onClick={onClick} onDisableClick={onDisableClick} backgroundColor={backgroundColor}>
            {
                loading ?
                    <MyLoader width={loaderWidth}/>
                    :
                    children
            }
        </Material>
    )
}

export default memo(Button)