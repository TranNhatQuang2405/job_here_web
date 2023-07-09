export const genArrayPage = (page, totalPage) => {
    let arrayResult = []
    if (page <= 2) {
        if (totalPage >= 6) {
            for (let x = 0; x < 5; x++) {
                arrayResult.push({ isNumber: true, pageNumber: x })
            }
            arrayResult.push({ isNumber: false })
        } else {
            for (let x = 0; x < totalPage; x++) {
                arrayResult.push({ isNumber: true, pageNumber: x })
            }
        }
    } else if (page > 2) {
        arrayResult.push({ isNumber: false })
        if (totalPage >= 6) {
            for (let x = 0; x < 5; x++) {
                if (x + page - 2 < totalPage)
                    arrayResult.push({ isNumber: true, pageNumber: x + page - 2 })
            }
            if (page + 3 < totalPage)
                arrayResult.push({ isNumber: false })
        }
        else {
            for (let x = 0; x < totalPage; x++) {
                if (x + page - 2 < totalPage)
                    arrayResult.push({ isNumber: true, pageNumber: x + page - 2 })
            }
        }
    }
    return arrayResult
}