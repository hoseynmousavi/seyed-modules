import MyLoader from "./MyLoader"

function LoadingWrapper({className, haveBg})
{
    return (
        <div className={`loading-wrapper ${className} ${haveBg ? "have-bg" : ""}`}>
            <MyLoader width={40}/>
        </div>
    )
}

export default LoadingWrapper