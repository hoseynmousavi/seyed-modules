import checkOs from "./checkOs"

function blockIosSwipe()
{
    if (checkOs() === "ios")
    {
        document.getElementById("root").ontouchstart = e =>
        {
            if (!(e.pageX === undefined || (e.pageX && e.pageX > 24 && e.pageX < window.innerWidth - 24))) e.preventDefault()
        }
    }
}

export default blockIosSwipe