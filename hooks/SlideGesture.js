import {useRef, useState} from "react"
import Resize from "./Resize"
import getComputedStyleHelper from "../helpers/getComputedStyleHelper"

function SlideGesture({slideNumbers, rightToLeft = true, mainSlideAnime = false, slideWidth})
{
    let started = useRef(false)
    let changing = useRef(false)
    let posX = useRef(0)
    let posY = useRef(0)
    let translateX = useRef(0)
    let deltaX = useRef(0)
    let deltaY = useRef(0)
    let slideBackRef = useRef(null)
    let slideRef = useRef(null)
    let currentSlide = useRef(1)
    const [slideIndex, setSlideIndex] = useState(1)
    const {clientWidth} = Resize()
    const viewport = +getComputedStyleHelper("--desktop-viewport").replace("px", "")
    const windowWidth = slideWidth || Math.min(clientWidth, viewport)

    function onTouchStart(e)
    {
        posX.current = e.touches?.[0].clientX || e.clientX
        posY.current = e.touches?.[0].clientY || e.clientY
        if (posX.current && posY.current)
        {
            started.current = true

            if (!e.touches?.[0].clientX)
            {
                document.addEventListener("mousemove", onTouchMove, {passive: true})
                document.addEventListener("mouseup", onTouchEnd, {passive: true})
            }
        }
    }

    function onTouchMove(e)
    {
        deltaX.current = posX.current - (e.touches?.[0].clientX || e.clientX)
        deltaY.current = posY.current - (e.touches?.[0].clientY || e.clientY)

        if (changing.current || (started.current && deltaY.current < 15 && deltaY.current > -15))
        {
            changing.current = true
            const maxTranslate = (rightToLeft ? 1 : -1) * (windowWidth * (slideNumbers - 1))
            const minTranslate = 0
            posX.current = e.touches?.[0].clientX || e.clientX
            translateX.current =
                (translateX.current - deltaX.current >= minTranslate) && (translateX.current - deltaX.current <= maxTranslate) ?
                    translateX.current - deltaX.current
                    :
                    translateX.current - (deltaX.current / 1.5)

            slideRef.current.style.transform = `translate3d(${translateX.current}px,0,0)`
            if (slideBackRef.current) slideBackRef.current.style.transform = `translate3d(${Math.max(minTranslate, Math.min(translateX.current, maxTranslate))}px,0,0)`
        }
        started.current = false
    }

    function onTouchEnd()
    {
        if (changing.current)
        {
            changing.current = false
            if (deltaX.current >= 3)
            {
                if (rightToLeft) setSlide(currentSlide.current - 1, Math.abs(deltaX.current))
                else setSlide(currentSlide.current + 1, Math.abs(deltaX.current))
            }
            else if (deltaX.current <= -3)
            {
                if (rightToLeft) setSlide(currentSlide.current + 1, Math.abs(deltaX.current))
                else setSlide(currentSlide.current - 1, Math.abs(deltaX.current))
            }
            else
            {
                const dist = (rightToLeft ? 1 : -1) * ((currentSlide.current - 1) * windowWidth)
                if (Math.abs(translateX.current - dist) > windowWidth / 2)
                {
                    if (translateX.current - dist > 0)
                    {
                        if (rightToLeft) setSlide(currentSlide.current + 1)
                        else setSlide(currentSlide.current - 1)
                    }
                    else
                    {
                        if (rightToLeft) setSlide(currentSlide.current - 1)
                        else setSlide(currentSlide.current + 1)
                    }
                }
                else setSlide(currentSlide.current)
            }
        }
        document.removeEventListener("mousemove", onTouchMove)
        document.removeEventListener("mouseup", onTouchEnd)
    }

    function setSlide(slide, deltaSpeed = 16)
    {
        const speedMeter = Math.max(1, (deltaSpeed / 16))
        if (slide >= 1 && slide <= slideNumbers) currentSlide.current = slide
        setSlideIndex(currentSlide.current)
        const preTranslateX = translateX.current
        const nextTranslateX = (rightToLeft ? 1 : -1) * (currentSlide.current - 1) * windowWidth
        const speed = Math.min(Math.abs(preTranslateX - nextTranslateX), 220) * 2 / speedMeter
        const maxTranslate = (rightToLeft ? 1 : -1) * (windowWidth * (slideNumbers - 1))
        const minTranslate = 0

        if (typeof requestAnimationFrame === "undefined")
        {
            translateX.current = nextTranslateX
            slideRef.current.style.transition = `transform linear ${speed}ms`
            slideRef.current.style.transform = `translate3d(${translateX.current}px,0,0)`
            if (slideBackRef.current) slideBackRef.current.style.transition = `transform ease ${speed}ms`
            if (slideBackRef.current) slideBackRef.current.style.transform = `translate3d(${translateX.current}px,0,0)`

            setTimeout(() =>
            {
                if (slideRef.current) slideRef.current.style.transition = "initial"
                if (slideBackRef.current) slideBackRef.current.style.transition = "initial"
            }, speed)
        }
        else
        {
            let pre = preTranslateX
            let preBack = preTranslateX
            const diff = nextTranslateX - preTranslateX
            let step = speed ? diff / (speed / 25) : 1
            let easeStep = 0
            const isNegative = diff < 0
            const allSteps = Math.floor(diff / step) + 1
            let currentStep = 1

            function translate()
            {
                if (allSteps / currentStep > 2)
                {
                    if (isNegative) easeStep--
                    else easeStep++
                }
                else
                {
                    if (isNegative) easeStep++
                    else easeStep--
                }

                currentStep++
                pre = Math[isNegative ? "max" : "min"](pre + step + (mainSlideAnime ? easeStep : 0), nextTranslateX)
                if (slideRef.current) slideRef.current.style.transform = `translate3d(${pre}px,0,0)`
                if (slideBackRef.current)
                {
                    preBack = Math[isNegative ? "max" : "min"](preBack + step + easeStep, nextTranslateX)
                    slideBackRef.current.style.transform = `translate3d(${Math.max(minTranslate, Math.min(preBack, maxTranslate))}px,0,0)`
                }
                translateX.current = pre
                if (((!isNegative && pre < nextTranslateX) || (isNegative && pre > nextTranslateX)) && !changing.current) window.requestAnimationFrame(translate)
            }

            window.requestAnimationFrame(translate)
        }
    }

    return {
        slideIndex: rightToLeft ? slideIndex : slideNumbers - (slideIndex - 1),
        onTouchStart,
        onTouchMove,
        onTouchEnd,
        slideRef,
        slideBackRef,
        setSlide,
    }
}

export default SlideGesture