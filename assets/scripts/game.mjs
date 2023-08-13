export class Game{
    constructor(firstPlayer, secondPlayer, hash)
    {
        this.firstPlayer = firstPlayer
        this.secondPlayer = secondPlayer
        this.hash = hash
    }

    updateHash(index, player){
        let row = Math.floor(index / 3)
        let column = (index - row * 3) % 3
        if(player == 'first')
            this.hash[row][column] = 1
        else this.hash[row][column] = 2
        return this.hash
    }

    isGameFinished(counter, first, second){
        let finishConditions = [
            [{i: 0, j: 0}, {i: 0, j: 1}, {i: 0, j: 2}],
            [{i: 1, j: 0}, {i: 1, j: 1}, {i: 1, j: 2}],
            [{i: 2, j: 0}, {i: 2, j: 1}, {i: 2, j: 2}],
            [{i: 0, j: 0}, {i: 1, j: 1}, {i: 2, j: 2}],
            [{i: 0, j: 2}, {i: 1, j: 1}, {i: 2, j: 0}],
            [{i: 0, j: 0}, {i: 1, j: 0}, {i: 2, j: 0}],
            [{i: 0, j: 1}, {i: 1, j: 1}, {i: 2, j: 1}],
            [{i: 0, j: 2}, {i: 1, j: 2}, {i: 2, j: 2}],
        ]
        for (let j = 0; j < finishConditions.length; j++)
        {
            let combination = [0,0,0]
            for(let k = 0; k < 3; k++)
            {
                combination[k] = this.hash[finishConditions[j][k].i][finishConditions[j][k].j]
            }
            if(combination[0] == combination[1] && combination[1] == combination[2] && combination[0] == '1')
            {
                first.winner = 1    
                return true
            }
            else if(combination[0] == combination[1] && combination[1] == combination[2] && combination[0] == '2')
            {
                second.winner = 1
                return true
            }
        }
        if(counter == 9)
            return true
        return false
    }
}

