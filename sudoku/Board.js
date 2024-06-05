class Board {

	constructor(difficulty) {
		this.difficulty = difficulty
		document.getElementById('difficulty').innerHTML = difficulty
		this.cells = Array(81).fill(null)
		this.rows = []
		this.cols = []
		this.nonets = []
		this.highlighted = []
		this.selected = null
		this.completed = false

		// TODO: get data
		let data = "800000000000100020400000539030900450050760900000030006000086002003010008000000300"

		// validate board
		if (data.length != 81) {
			// either too many cells or not enough
			alert("selected board does not contain 81 cells")
			console.log(data)
		}

		// initialize 2d arrays
		for (let i = 0; i < 9; i++) {
			this.rows.push([])
			this.cols.push([])
			this.nonets.push([])
			for (let j = 0; j < 9; j++) {
				this.rows[i].push(null)
				this.cols[i].push(null)
				this.nonets[i].push(null)
			}
		}

		// initialize cells
		for (let row = 0; row < 9; row++) 
			for (let col = 0; col < 9; col++) {
				let new_cell = new Cell(data[(row * 9) + col], row, col)
				this.cells[(row * 9) + col] = new_cell
				this.rows[row][col] = new_cell
				this.cols[col][row] = new_cell
				this.nonets[new_cell.nonet][(row%3)*3 + (col%3)] = new_cell
			}

		// populate neighbors
		this.cells.forEach(cell1 => {
			this.rows[cell1.row].forEach(cell2 => {
				if (cell1 != cell2)
					cell1.neighbors.push(cell2)
			})
			this.cols[cell1.col].forEach(cell2 => {
				if (cell1 != cell2)
					cell1.neighbors.push(cell2)
			})
			this.nonets[cell1.nonet].forEach(cell2 => {
				if (cell1 != cell2 && cell1.row != cell2.row && cell1.col != cell2.col)
					cell1.neighbors.push(cell2)
			})
		})

		this.update_all_marks()
	}

	update_all_marks() {
		this.cells.forEach(cell => {
			cell.all_marks = [1, 2, 3, 4, 5, 6, 7, 8, 9]
		})
		this.cells.forEach(cell1 => {
			cell1.neighbors.forEach(neighbor => {
				cell1.rem_candidate_mark(neighbor.value, candidate.ALL)
			});
		})
	}

	highlight(cell) {
		if (cell && !this.highlighted.includes(cell)) {
			this.highlighted.push(cell)
		}
	}

	select(cell) {
		this.selected = cell
		this.highlight(cell)
	}

	clear_highlighting() {
		this.highlighted = []
	}

	// returns
	// -1 if none of the highlighted cells contain value
	// 0 if some of the highlighted cells contain value
	// 1 if all of the highlighted cells contain value
	highlighted_contains(value, candidate_type) {
		let val = parseInt(value)
		let count = 0
		let blank_cells = 0 // number of blank highlighted
		this.highlighted.forEach(cell => {
			if (!cell.value)
				blank_cells++

			switch (candidate_type) {
			case candidate.ALL:
				if (cell.all_marks.includes(val))
					count++
				break
			case candidate.CELL:
				if (cell.cell_marks.includes(val))
					count++
				break
			case candidate.BOX:
				if (cell.box_marks.includes(val))
					count++
				break
			}
		})	

		if (count == 0)
			return -1
		if (count < blank_cells)
			return 0
		else
			return 1
	}

	check_for_win() {
		if (this.completed)
			return

		//check if board is full
		let filled = 0
		this.cells.forEach(cell => {
			if (cell.value)
				filled++
		})
		if (filled != 81)
			return

		let sol = [1, 2, 3, 4, 5, 6, 7, 8, 9]

		//check that each row has 1 -> 9
		this.rows.forEach(row => {
			let row_vals = []
			for (let i = 0; i < row.length; i++)
				row_vals.push(row[i].value)
			row_vals.sort()
			for (let i = 0; i < row_vals.length; i++)
				if (row_vals[i] !== sol[i])
					return false;
		})

		//check that each col has 1 -> 9
		this.cols.forEach(col => {
			let col_vals = []
			for (let i = 0; i < col.length; i++)
				col_vals.push(col[i].value)
			col_vals.sort()
			for (let i = 0; i < col_vals.length; i++)
				if (col_vals[i] !== sol[i])
					return false;
		})

		// check that each nonet has 1 -> 9
		this.nonets.forEach(nonet => {
			let nonet_vals = []
			for (let i = 0; i < nonet.length; i++)
				nonet_vals.push(nonet[i].value)
			nonet_vals.sort()
			for (let i = 0; i < nonet_vals.length; i++)
				if (nonet_vals[i] !== sol[i])
					return false;
		})

		this.completed = true
		alert("we have a winner!")
	}

	draw() {

		// draw background
		c.fillStyle = "black"
		c.fillRect(0, 0, board_size, board_size)

		// draw cells
		this.cells.forEach(cell => {
			// cell background
			c.fillStyle = cell.hovered ? "#ddd" : "white"
			c.fillRect(cell.x, cell.y, cell_width, cell_width)
			
			// concrete normal value
			if (!cell.editable) {
				c.fillStyle = "black"
				c.font = "50px Arial"
				c.textAlign = "center"
				c.textBaseline = "middle"
				c.fillText(cell.value, cell.x + (0.5 * cell_width), cell.y + (0.5 * cell_width))
			}

			// editable normal value
			if (cell.editable && cell.value) {
				c.fillStyle = "blue"
				c.font = "50px Arial"
				c.textAlign = "center"
				c.textBaseline = "middle"
				c.fillText(cell.value, cell.x + (0.5 * cell_width), cell.y + (0.5 * cell_width))
			}

			// all marks and cell marks
			if (cell.editable && !cell.value) {
				c.fillStyle = "#777"
				c.font = "20px Arial"
				c.textAlign = "center"
				c.textBaseline = "middle"
				if (all_candidate_mode)
					c.fillText(cell.candidate_str(candidate.ALL), cell.x + (0.5 * cell_width), cell.y + (0.5 * cell_width))
				else // cell marks
					c.fillText(cell.candidate_str(candidate.CELL), cell.x + (0.5 * cell_width), cell.y + (0.5 * cell_width))
			}

			// box marks
			c.fillStyle = "grey"
			c.font = "17px Arial"
			c.textAlign = "center"
			c.textBaseline = "middle"
			if (cell.editable) {
				switch(cell.box_marks.length) {
				case 9:
					c.fillText(cell.box_marks[8], cell.x + cell_width/2, cell.y + cell_width/2)
				case 8:
					c.fillText(cell.box_marks[7], cell.x + cell_width - box_mark_spacing, cell.y + cell_width/2)
				case 7:
					c.fillText(cell.box_marks[6], cell.x + box_mark_spacing, cell.y + cell_width/2)
				case 6:
					c.fillText(cell.box_marks[5], cell.x + cell_width/2, cell.y + cell_width - box_mark_spacing)
				case 5:
					c.fillText(cell.box_marks[4], cell.x + cell_width/2, cell.y + box_mark_spacing)
				case 4:
					c.fillText(cell.box_marks[3], cell.x + cell_width - box_mark_spacing, cell.y + cell_width - box_mark_spacing)
				case 3:
					c.fillText(cell.box_marks[2], cell.x + box_mark_spacing, cell.y + cell_width - box_mark_spacing)
				case 2:
					c.fillText(cell.box_marks[1], cell.x + cell_width - box_mark_spacing, cell.y + box_mark_spacing)
				case 1:
					c.fillText(cell.box_marks[0], cell.x + box_mark_spacing, cell.y + box_mark_spacing)
				}
			}

		})

		// draw cell borders
		c.fillStyle = "grey"
		// nonet_{x, y}: cordinates of the top left corner of each nonet
		for (let nonet_x = nonet_gap; nonet_x < board_size; nonet_x += (3*cell_width + nonet_gap)) {
			for (let nonet_y = nonet_gap; nonet_y < board_size; nonet_y += (3*cell_width + nonet_gap)) {
				c.fillRect(nonet_x + cell_width - (cell_stroke_width/2),
						   nonet_y, cell_stroke_width, 3*cell_width)
				c.fillRect(nonet_x + 2*cell_width - (cell_stroke_width/2),
						   nonet_y, cell_stroke_width, 3*cell_width)
				c.fillRect(nonet_x,  nonet_y + cell_width - (cell_stroke_width/2),
						   3*cell_width, cell_stroke_width)
				c.fillRect(nonet_x, nonet_y + 2*cell_width - (cell_stroke_width/2),
						   3*cell_width, cell_stroke_width)
			}			
		}

		// draw highlighted region(s)
		c.fillStyle = "yellow"
		this.highlighted.forEach(cell => {

			let top_neighbor    = cell.row   ? this.highlighted.includes(this.cols[cell.col][cell.row-1]) : 0
			let bottom_neighbor = cell.row<8 ? this.highlighted.includes(this.cols[cell.col][cell.row+1]) : 0
			let left_neighbor   = cell.col   ? this.highlighted.includes(this.rows[cell.row][cell.col-1]) : 0
			let right_neighbor  = cell.col<8 ? this.highlighted.includes(this.rows[cell.row][cell.col+1]) : 0

			let top_left_neighbor     = cell.col   && cell.row   ? this.highlighted.includes(this.cols[cell.col-1][cell.row-1]) : 0
			let top_right_neighbor    = cell.col<8 && cell.row   ? this.highlighted.includes(this.cols[cell.col+1][cell.row-1]) : 0
			let bottom_right_neighbor = cell.col<8 && cell.row<8 ? this.highlighted.includes(this.rows[cell.row+1][cell.col+1]) : 0
			let bottom_left_neighbor  = cell.col   && cell.row<8 ? this.highlighted.includes(this.rows[cell.row+1][cell.col-1]) : 0

			// edges
			if (!top_neighbor)
				c.fillRect(cell.x, cell.y, cell_width, select_stroke_width)
			if (!right_neighbor)
				c.fillRect(cell.x+cell_width, cell.y, -select_stroke_width, cell_width)
			if (!bottom_neighbor)
				c.fillRect(cell.x, cell.y+cell_width, cell_width, -select_stroke_width)
			if (!left_neighbor)
				c.fillRect(cell.x, cell.y, select_stroke_width, cell_width)

			// corners
			if (top_neighbor && left_neighbor && !top_left_neighbor)
				c.fillRect(cell.x, cell.y, select_stroke_width, select_stroke_width)
			if (top_neighbor && right_neighbor && !top_right_neighbor)
				c.fillRect(cell.x+cell_width, cell.y, -select_stroke_width, select_stroke_width)
			if (bottom_neighbor && right_neighbor && !bottom_right_neighbor)
				c.fillRect(cell.x+cell_width, cell.y+cell_width, -select_stroke_width, -select_stroke_width)
			if (bottom_neighbor && left_neighbor && !bottom_left_neighbor)
				c.fillRect(cell.x, cell.y+cell_width, select_stroke_width, -select_stroke_width)	
		})
	}

	refresh() {
		this.draw()
		this.check_for_win()
	}
}