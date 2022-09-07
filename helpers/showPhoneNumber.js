import numberCorrection from "./numberCorrection"

export const phoneSeparator = " "
export const phoneSeparatorRemove = / /g

function showPhone(phone)
{
    if (phone)
    {
        const input = numberCorrection(phone.replace(/ /g, "").replace("+98", "0"))
        return input && !isNaN(input) ?
            input.length >= 8 ?
                input.slice(0, 4) + phoneSeparator + input.slice(4, 7) + phoneSeparator + input.slice(7, input.length)
                :
                input.length >= 5 ?
                    input.slice(0, 4) + phoneSeparator + input.slice(4, input.length)
                    :
                    input
            :
            input
    }
    else return phone
}

function fixToNumber(phone)
{
    return phone.replace(phoneSeparatorRemove, "").trim().slice(0, 11)
}

const showPhoneNumber = {
    showPhone,
    fixToNumber,
}

export default showPhoneNumber