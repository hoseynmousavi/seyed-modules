function MyLoaderIos({className, width, color})
{
    return (
        <div className={`ios-loader ${className}`} style={{width: width + "px", height: width + "px"}}>
            <div className="ios-loader-part one">
                <div className="ios-loader-part-after" style={color && {backgroundColor: color}}/>
            </div>
            <div className="ios-loader-part two">
                <div className="ios-loader-part-after" style={color && {backgroundColor: color}}/>
            </div>
            <div className="ios-loader-part three">
                <div className="ios-loader-part-after" style={color && {backgroundColor: color}}/>
            </div>
            <div className="ios-loader-part four">
                <div className="ios-loader-part-after" style={color && {backgroundColor: color}}/>
            </div>
            <div className="ios-loader-part five">
                <div className="ios-loader-part-after" style={color && {backgroundColor: color}}/>
            </div>
            <div className="ios-loader-part six">
                <div className="ios-loader-part-after" style={color && {backgroundColor: color}}/>
            </div>
            <div className="ios-loader-part seven">
                <div className="ios-loader-part-after" style={color && {backgroundColor: color}}/>
            </div>
            <div className="ios-loader-part eight">
                <div className="ios-loader-part-after" style={color && {backgroundColor: color}}/>
            </div>
        </div>
    )
}

export default MyLoaderIos