// flatten an array
let arr = [1, [2,3], [4, [5,6]]]
let res = []

const flat = (arr, res) => {
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            res = [...flat(arr[i], res)]
        }
        else {
            res.push(arr[i])
        }
    }
    return res
}

flat(arr, [])