function scrollWithDragDrop({ref})
{
    let mosPositions = {top: 0, left: 0, x: 0, y: 0}

    ref.addEventListener("mousedown", mouseDown, {passive: true})

    function mouseDown(e)
    {
        mosPositions = {
            left: ref.scrollLeft,
            top: ref.scrollTop,
            x: e.clientX,
            y: e.clientY,
        }
        ref.style.cursor = "grabbing"
        setTimeout(() => ref.classList.toggle("dragging"), 200)
        document.addEventListener("mousemove", elementDrag, {passive: true})
        document.addEventListener("mouseup", mouseUp, {passive: true})
    }

    function elementDrag(e)
    {
        const dx = e.clientX - mosPositions.x
        const dy = e.clientY - mosPositions.y
        ref.scrollTo({top: mosPositions.top - dy, left: mosPositions.left - dx})
    }

    function mouseUp()
    {
        ref.style.cursor = "grab"
        setTimeout(() => ref.classList.toggle("dragging"), 100)
        document.removeEventListener("mousemove", elementDrag)
        document.removeEventListener("mouseup", mouseUp)
    }
}

export default scrollWithDragDrop