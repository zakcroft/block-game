export const COLOURS = ['red', 'green', 'blue', 'yellow'];
const MAX_X = 10;
const MAX_Y = 10;
const removedBlockColour = "white"

export class Block {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.colour = COLOURS[Math.floor(Math.random() * COLOURS.length)];
    }
}

export class BlockGrid {
    constructor () {
        this.grid = [];

        for (let x = 0; x < MAX_X; x++) {
            let col = [];
            for (let y = 0; y < MAX_Y; y++) {
                col.push(new Block(x, y));
            }

            this.grid.push(col);
        }

        return this;
    }

    render (el = document.querySelector('#gridEl')) {
        for (let x = 0; x < MAX_X; x++) {   
            let id = 'col_' + x;
            let colEl = document.createElement('div');
            colEl.className = 'col';
            colEl.id = id;
            el.appendChild(colEl);

            for (let y = MAX_Y - 1; y >= 0; y--) {
                let block = this.grid[x][y],
                    id = `block_${x}x${y}`,
                    blockEl = document.createElement('div');

                blockEl.id = id;
                blockEl.className = 'block';
                blockEl.style.background = block.colour;
                colEl.appendChild(blockEl);
            }
        }
        document.body.addEventListener('click', (evt) => this.blockClicked(evt));
        return this;
    }

	removeBlock(blockEl, colour){
            blockEl.style.background = removedBlockColour;
            blockEl.className += " removed";
            this.findNeighbours(blockEl, 'y', colour);
            this.findNeighbours(blockEl, 'x', colour);
    }
    
    findNeighbours(startEl, axis, colour){
        const [x, y] = startEl.id.split('_').pop().split('x').map(Number);
		    const startPosition = axis === 'x' ?  x :  y;
		    const neighbourPositions = [startPosition + 1, startPosition - 1];
		    const MAX = axis === 'x' ?  MAX_X : MAX_Y;
        
		neighbourPositions.forEach((n) => {
			if(n >= 0 && n < MAX){
				let neighbourEl = axis === 'x' ?  this.getBlock(n, y) : this.getBlock(x, n);
                if(neighbourEl !== null){
                    let neighbourColour = neighbourEl.style.background;
                    if(neighbourColour === colour && neighbourColour !== removedBlockColour){
                        this.removeBlock(neighbourEl, colour);
                    }
                }
			}
		})
    }
    
    sortCols(){
		for(let x = 0; x < MAX_X; x++){
			const colQuery = '#col_' + x;
			const query = colQuery + ' div';
			const col = document.querySelector(colQuery);
			const divs = Array.from(document.querySelectorAll(query));
			divs.forEach((div) => {
				if(div.className.search(/removed/) !== -1){
					let oldChild = col.removeChild(div);
					col.insertBefore(oldChild, col.firstChild);
				}
			});
		}
    }

    reconfigureCols(){
        for(let x = 0; x < MAX_X; x++) {
            let y = MAX_Y -1;
            const divs = Array.from(document.querySelectorAll('#col_' + x + ' div'));
            divs.forEach((div) => {
                div.id = `block_${x}x${y--}`;
            });
        }
    }

    getBlock(x, y){
        const id = `block_${x}x${y}`;
        return document.getElementById(id);
    }
    
    blockClicked (e) {
        this.removeBlock(e.target, e.target.style.background);
        this.sortCols();
        this.reconfigureCols();
    }
}
