const configToast = () =>
{
    if (!window.addToast)
    {
        window.addToast = function ({message, type, onClick, isUndo, removeOnChangeLocation})
        {
            const event = new CustomEvent("addToast", {detail: {message, type, onClick, isUndo, removeOnChangeLocation}})
            window.dispatchEvent(event)
        }
    }
}

const addToast = ({message, type, onClick, isUndo, removeOnChangeLocation}) =>
{
    window.addToast({message, type, onClick, isUndo, removeOnChangeLocation})
}

const toastManager = {
    configToast,
    addToast,
}

export default toastManager