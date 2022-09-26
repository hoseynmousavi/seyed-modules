import goBack from "./goBack"
import toastManager from "./toastManager"

function closeAndToast({back: {fallback, delta} = {}, toast: {message, type, isUndo, onClick, removeOnChangeLocation}})
{
    goBack({fallback, delta})
    if (message) setTimeout(() => toastManager.addToast({message, type, isUndo, onClick, removeOnChangeLocation}), 150)
}

export default closeAndToast