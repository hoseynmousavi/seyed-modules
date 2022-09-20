import React, {Suspense} from "react"
import LoadingWrapper from "./LoadingWrapper"

function SwitchItem({index, children, stateLength, showChildIndex, location, isAuth, isTab, id, onTouchStart, onTouchMove, onTouchEnd})
{
    const isRendering = index === stateLength - 1
    const output = <Suspense fallback={<LoadingWrapper haveBg key="loading-wrapper"/>}>{React.cloneElement(children[showChildIndex], {location, isRendering})}</Suspense>
    if (isAuth || isTab) return output
    else return (
        <div className="switch-cont"
             onTouchStart={onTouchStart}
             onTouchMove={onTouchMove}
             onTouchEnd={onTouchEnd}
             style={{opacity: id === "initial" ? "1" : "0", contentVisibility: id === "initial" ? "visible" : "hidden"}}
             id={id}>
            <div id={isRendering ? "main-render" : ""} className="switch">
                {output}
            </div>
        </div>
    )
}

export default SwitchItem