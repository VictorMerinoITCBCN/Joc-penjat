const compareArrays = (arr1, arr2) => {
    return arr1.every((content, index) => content === arr2[index])
}