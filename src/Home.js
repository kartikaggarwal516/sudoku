import React, { Component } from "react"
import "./Assets/Styles/home.css"

class Home extends Component {
    state = {
        puzzle: [
            [5, 3, 0, 0, 7, 0, 0, 0, 0],
            [6, 0, 0, 1, 9, 5, 0, 0, 0],
            [0, 9, 8, 0, 0, 0, 0, 6, 0],
            [8, 0, 0, 0, 6, 0, 0, 0, 3],
            [4, 0, 0, 8, 3, 0, 0, 1, 0],
            [7, 0, 0, 0, 2, 0, 0, 0, 6],
            [0, 6, 0, 0, 0, 0, 2, 8, 0],
            [0, 0, 0, 4, 1, 9, 0, 0, 5],
            [0, 0, 0, 0, 8, 0, 0, 7, 9]
        ],
        result: []
    }
    
    changeHandler = (event,i,j) => {
        
        const num = event.target.value
        console.log("num", num)
        console.log("i",i,"j",j,"result",this.state.result[i][j])

        if(num=="")
            {
                const newpuzzle = this.state.puzzle
                newpuzzle[i][j] = num
                this.setState({puzzle: [...newpuzzle] })
            }

            else if(num != this.state.result[i][j])
            alert("Wrong Input")

            else
            {
                const newpuzzle = this.state.puzzle
                newpuzzle[i][j] = num
                this.setState({puzzle: [...newpuzzle] })
            }         
    }

    componentDidMount(){
        this.setState( {result : SudokuSolver(this.state.puzzle)} )        
    }

    render() {
        const { puzzle } = this.state
        return (
            <div className="outerBox">
                {puzzle.map( (row,i) => {
                    return (
                        <div className="row">
                        {row.map( (col,j) => {
                            return (
                                <div key={j} className="gridBox">
                                    {puzzle[i][j] !==0 && puzzle[i][j] !=="" ? puzzle[i][j]
                                     :<input type="number" onChange={(event) => this.changeHandler(event,i,j)} />
                                    }                                   
                                </div>
                            )
                        })}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Home

const SudokuSolver = puzzle => {

    puzzle = JSON.parse( JSON.stringify(puzzle) )

    let emptySpaces = 10

    while (emptySpaces > 0) {
        emptySpaces = 0

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (puzzle[row][col] == 0) {
                    let nonPossibilities = {}
                    for (let i = 0; i < 9; i++) {
                        if (puzzle[row][i] > 0)
                            nonPossibilities[puzzle[row][i]] = true
                        if (puzzle[i][col] > 0)
                            nonPossibilities[puzzle[i][col]] = true
                    }
                    for (let gridrow = Math.floor(row / 3) * 3; gridrow < Math.floor(row / 3) * 3 + 3; gridrow++) {
                        for (let gridcol = Math.floor(col / 3) * 3; gridcol < Math.floor(col / 3) * 3 + 3; gridcol++) {
                            if (puzzle[gridrow][gridcol])
                                nonPossibilities[puzzle[gridrow][gridcol]] = true
                        }
                    }

                    let filledNumbers = Object.keys(nonPossibilities)

                    if (filledNumbers.length === 8) {
                        for (let i = 1; i < 10; i++) {
                            if ( !(filledNumbers.includes( i.toString() )) )
                                puzzle[row][col] = i                    
                        }
                    }
                    else
                        emptySpaces++
                }
            }
        }
    }
    return puzzle
}
