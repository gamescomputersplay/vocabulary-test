const levels = [ 'A1', 'A2', 'B1', 'B2', 'C1', 'C2' ]
let useLocalData = true

// When published, use real API
if (document.location.href.includes("how-many-words-do-you-know.com")){
    useLocalData = false
}

export {levels, useLocalData }