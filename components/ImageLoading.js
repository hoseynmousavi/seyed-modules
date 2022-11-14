import {forwardRef, useRef} from "react"

const ImageLoading = forwardRef(({className, style, src, alt, loading, onClick, draggable}, ref) =>
{
    const contRef = useRef(null)
    const loadedRef = useRef(checkLoaded())

    function checkLoaded()
    {
        const img = new Image()
        img.loading = "lazy"
        img.decoding = "async"
        img.src = src
        return img.complete
    }

    function loaded()
    {
        if (!loadedRef.current)
        {
            loadedRef.current = true
            contRef.current.className = className
            ref.current.className = `${className} image-loading-main load-end`
            ref.current.addEventListener("click", onClick)
        }
    }

    return (
        <div className={`${className} ${loadedRef.current ? "" : "image-loading"}`} style={style} ref={contRef}>
            <img decoding={loadedRef.current ? "auto" : "async"}
                 draggable={draggable}
                 className={`${className} image-loading-main ${loadedRef.current ? "loaded" : ""}`}
                 onLoad={loaded}
                 style={style}
                 ref={ref}
                 src={src}
                 alt={alt}
                 loading={loading}
                 onClick={loadedRef.current ? onClick : undefined}
            />
        </div>
    )
})

export default ImageLoading