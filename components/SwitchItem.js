import React, {Suspense} from "react"
import LoadingWrapper from "./LoadingWrapper"

function SwitchItem({index, stateLength, element, location, isTab, id, onTouchStart, onTouchMove, onTouchEnd})
{
    const isRendering = index === stateLength - 1
    const output = <Suspense fallback={<LoadingWrapper haveBg key="loading-wrapper"/>}>{React.cloneElement(element, {location, isRendering})}</Suspense>
    const isVisible = id.includes("initial")
    return (
        <div className={`switch-cont ${isTab ? "tab" : ""}`}
             onTouchStart={onTouchStart}
             onTouchMove={onTouchMove}
             onTouchEnd={onTouchEnd}
             style={{opacity: isVisible ? "1" : "0", contentVisibility: isVisible ? "visible" : "hidden"}}
             id={id}>
            <div className={`switch ${isRendering ? "main-render" : ""}`}>
                {output}
            </div>
        </div>
    )
}

export default SwitchItem