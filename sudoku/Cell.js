class Cell {

	constructor(value, row, col) {
		this.value = parseInt(value)
		this.editable = (this.value == 0)
		this.hovered = false
		this.box_marks = []
		this.cell_marks = []
		this.all_marks = []

		// top left is (0, 0)
		this.row = row
		this.col = col
		this.neighbors = [] // all cells "seen" by this cell

		let nonet_row = Math.floor(this.row / 3)
		let nonet_col = Math.floor(this.col / 3)
		this.nonet = (nonet_row * 3) + nonet_col

		this.x = nonet_gap + (this.col * cell_width) + (nonet_col * nonet_gap)
		this.y = nonet_gap + (this.row * cell_width) + (nonet_row * nonet_gap)

	}

	select() {
		this.selected = true
		this.highlighted = true
	}

	add_candidate_mark(value, candidate_type) {
		let val = parseInt(value)
		if (val && !this.value) {
			switch (candidate_type) {
			case candidate.ALL:
				if (!this.all_marks.includes(val)) {
					this.all_marks.push(parseInt(val))
					this.all_marks.sort()
				}
				break
			case candidate.CELL:
				if (val && !this.cell_marks.includes(val)) {
					this.cell_marks.push(parseInt(val))
					this.cell_marks.sort()
				}
				break
			case candidate.BOX:
				if (!this.box_marks.includes(val)) {
					this.box_marks.push(parseInt(val))
					this.box_marks.sort()
				}
				break
			}
		}
	}

	rem_candidate_mark(value, candidate_type) {
		if (value == "all") {
			switch (candidate_type) {
			case candidate.ALL:
				this.all_marks = []
				break
			case candidate.CELL:
				this.cell_marks = []
				break
			case candidate.BOX:
				this.box_marks = []
				break
			}
			return
		}

		let val = parseInt(value)
		if (!val)
			return

		switch (candidate_type) {
		case candidate.ALL:
			if (this.all_marks.includes(val)) {
				this.all_marks.splice(this.all_marks.indexOf(val), 1)
			}
			break
		case candidate.CELL:
			if (this.cell_marks.includes(val)) {
				this.cell_marks.splice(this.cell_marks.indexOf(val), 1)
			}
			break
		case candidate.BOX:
			if (this.box_marks.includes(val)) {
				this.box_marks.splice(this.box_marks.indexOf(val), 1)
			}
			break
		}
	}

	edit_value(value) {
		let val = parseInt(value)

		if (this.editable)
			this.value = val

		// clear all of the candidates for this cell
		this.box_marks = []
		this.cell_marks = []
		this.all_marks = []

		// if you typed 1-9, clear that value from all of the
		// neighbors' candidates
		if (val) {
			this.neighbors.forEach(neighbor => {
				neighbor.rem_candidate_mark(val, candidate.ALL)
				neighbor.rem_candidate_mark(val, candidate.CELL)
				neighbor.rem_candidate_mark(val, candidate.BOX)

			});
		}
	}


	candidate_str(candidate_type) {
		let out = ""
		switch (candidate_type) {
		case candidate.ALL:
			this.all_marks.forEach(mark => {
				if (mark)
					out += mark.toString()
			})
			break
		case candidate.CELL:
			this.cell_marks.forEach(mark => {
				if (mark)
					out += mark.toString()
			})
			break
		}
		return out
	}
}