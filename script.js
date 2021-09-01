const ranges = [
    [[0,0],[2,2]], [[0,3],[2,5]], [[0,6],[2,8]],
    [[3,0],[5,2]], [[3,3],[5,5]], [[3,6],[5,8]],
    [[6,0],[8,2]], [[6,3],[8,5]], [[6,6],[8,8]]
]

let table = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
]

const findRange = (x, y) => {
    let chosenBox
    
    ranges.map( (box, index) => {
        if(x >= box[0][0] && x <= box[1][0] && y >= box[0][1] && y <= box[1][1]){
            chosenBox = box
        }
    })



    for(let i = chosenBox[0][0]; i <= chosenBox[1][0]; i++){
        for(let j = chosenBox[0][1]; j <= chosenBox[1][1]; j++){
        }
    }
    
    return chosenBox
}


const isBoxFree = (num, x, y) => {
    let box = findRange(x, y)

    let isBoxOk = true

    for(let i = box[0][0]; i <= box[1][0]; i++){
        for(let j = box[0][1]; j <= box[1][1]; j++){
            if(table[i][j] === num){

                //console.log("box not free")
                isBoxOk = false;
            
            }
        }
    }

    return isBoxOk;
}


const isRowFree = (num, row) => {
    let isOk = true

    table[row].map(value => {
        
        if(value === num){
            //console.log("Row not free")
            isOk = false
        }
    })

    return isOk
}

const isColumnFree = (num, col) => {
    let isColOk = true;

    table.map(line => {
        if(line[col] === num) {
            //console.log("col not free")
            isColOk = false;
        }
    })

    return isColOk;
}

const generateRandom = (max) => {
    return Math.floor(Math.random() * (max - 1) + 1)
}


const fillRecursively = (x, y) => {
    //console.log("Fill recursively")
    if(y >= 9){
        x++;
        y = 0
    }

    if(x >= 9){
        //console.log("END")
        return true;
    }

    console.log(`${x} - ${y}`)
    let possible = [1,2,3,4,5,6,7,8,9]

    while(possible.length > 0) {
        let num = possible[generateRandom(possible.length - 1)]

        if(isRowFree(num, x) && isColumnFree(num, y) && isBoxFree(num, x, y)){ 
            table[x][y] = num
            
            if(fillRecursively(x, y+1)){
                return true
            }
            else{
                possible.splice(possible.indexOf(num), 1)
            }
        }
        else{
            possible.splice(possible.indexOf(num), 1)
        }

        if(possible.length === 0){
            table[x][y] = 0
            //console.log("backtracking for more options " + `At cell ${x} - ${y}`)
            console.log(possible)
            return false
        }
    }

}

const fillDiagonal = () => {
    for(let d = 0; d <= 8; d+=4){
        for(let i = ranges[d][0][0]; i <= ranges[d][1][0]; i++){
            for(let j = ranges[d][0][1]; j <= ranges[d][1][1]; j++){
                
                let possible = [1, 2, 3, 4, 5, 6, 7, 8, 9]

                while(table[i][j] === 0){
                    if(possible.length === 0){
                        console.log(`********No more options!*********`)
                        break;
                    }
                    else{
                        let num = possible[generateRandom(possible.length - 1)]
    
                        console.log("num chosen: " + num)
    
                        if(isBoxFree(num, i, j)){
                            table[i][j] = num
                        }
                        else{
                            console.log(`box already has ${num}`)
                            possible.splice(possible.indexOf(num), 1)
                        }
                    }
                }

            }
        }
    }
}

const FillTable = () => {

    //console.time("fillRec")
    fillRecursively(0, 0)
    //console.timeEnd("fillRec")
    console.log(table)
}

FillTable()