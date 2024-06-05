const container = document.getElementById("main_container")
const canvas = document.getElementById("board")
const c = canvas.getContext("2d")


const mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
}

nonet_gap = 6
cell_width = 80
cell_stroke_width = 2
select_stroke_width = 6
board_size = (9 * cell_width) + (4 * nonet_gap)
box_mark_spacing = 15

canvas.width = board_size
canvas.height = board_size
container.width = board_size

all_candidate_mode = false // true when user enables all-candidates mode

var canvas_rect = canvas.getBoundingClientRect();

let mouse_down = false
let shift_up_time = 0 // timestamp when the shift key goes up

board = new Board("Medium")
board.refresh()

// Event Listeners
addEventListener('mousemove', e => {
	let mouse_x = e.clientX - canvas.getBoundingClientRect().left
	let mouse_y = e.clientY - canvas.getBoundingClientRect().top

	board.cells.forEach(function(cell) {
		let mouse_is_over = mouse_x >= cell.x && mouse_x <= cell.x + cell_width &&
		               	    mouse_y >= cell.y && mouse_y <= cell.y + cell_width
		if (mouse_is_over && mouse_down)
			board.select(cell)

		cell.hovered = mouse_is_over
	})

	board.refresh()
})

addEventListener('mousedown', e => {
	mouse_down  = true
	let mouse_x = e.clientX - canvas.getBoundingClientRect().left
	let mouse_y = e.clientY - canvas.getBoundingClientRect().top
	
	if (!e.shiftKey)
		board.clear_highlighting()

	board.cells.forEach(function(cell) {
		if(mouse_x >= cell.x && mouse_x <= cell.x + cell_width &&
		   mouse_y >= cell.y && mouse_y <= cell.y + cell_width)
			board.select(cell)
	})

	board.refresh()
})

addEventListener('mouseup', e => {
	mouse_down = false
})

addEventListener('keydown', e => {
	if(e.ctrlKey || e.shiftKey)
        e.preventDefault();

	// ignore extranious key events
	if (e.isComposing || e.keyCode === 229)
		return

	let refresh_board = false
	let sel = board.selected
	// true if you use left shift and the numpad (gets around
	// a goofy windows quirk)
	let shift_plus_num = (e.timeStamp - shift_up_time) < 100

	// handle cases where a number is typed
	let typed_num = parseInt(e.code.substr(-1))
	if (sel && typed_num) {

		// editing cell/all candidate(s)
		if (e.ctrlKey) {
			// edit all candidates
			if (all_candidate_mode) {
				if (board.highlighted_contains(typed_num, candidate.ALL) < 1)
					board.highlighted.forEach(highlighted_cell => {
						highlighted_cell.add_candidate_mark(typed_num, candidate.ALL)
					})
				else {
					board.highlighted.forEach(highlighted_cell => {
						highlighted_cell.rem_candidate_mark(typed_num, candidate.ALL)
					})
				}
			// edit cell candidates
			} else {
				if (board.highlighted_contains(e.code.substr(-1), candidate.CELL) < 1)
					board.highlighted.forEach(highlighted_cell => {
						highlighted_cell.add_candidate_mark(typed_num, candidate.CELL)
					})
				else {
					board.highlighted.forEach(highlighted_cell => {
						highlighted_cell.rem_candidate_mark(typed_num, candidate.CELL)
					})
				}
			}
			
		// editing box candidate(s)
		} else if (shift_plus_num || board.highlighted.length >= 2) {
			if (board.highlighted_contains(e.code.substr(-1), candidate.BOX) < 1) {
				board.highlighted.forEach(highlighted_cell => {
					highlighted_cell.add_candidate_mark(typed_num, candidate.BOX)
				})
			} else {
				board.highlighted.forEach(highlighted_cell => {
					highlighted_cell.rem_candidate_mark(typed_num, candidate.BOX)
				})
			}

		// add a normal number
		} else {
			sel.edit_value(e.code.substr(-1))
		}

	// handle backspace
	} else if (sel && e.key == "Backspace") {
		board.highlighted.forEach(highlighted_cell => {
			highlighted_cell.edit_value('0')
			highlighted_cell.rem_candidate_mark('all', candidate.BOX)
			if (!all_candidate_mode)
				highlighted_cell.rem_candidate_mark('all', candidate.CELL)
		})

	// handle keyboard navigation cases
	} else if (board.selected) {
		switch (e.key) {
		case 'a':
		case 'A':
		case 'ArrowLeft':
			if (!e.shiftKey)
				board.clear_highlighting()
			board.select(board.cols[(sel.col-1+9)%9][sel.row])
			break
		case 'd':
		case 'D':
		case 'ArrowRight':
			if (!e.shiftKey)
				board.clear_highlighting()
			board.select(board.cols[(sel.col+1+9)%9][sel.row])
			break
		case 'w':
		case 'W':
		case 'ArrowUp':
			if (!e.shiftKey)
				board.clear_highlighting()
			board.select(board.rows[(sel.row-1+9)%9][sel.col])
			break
		case 's':
		case 'S':
		case 'ArrowDown':
			if (!e.shiftKey)
				board.clear_highlighting()
			board.select(board.rows[(sel.row+1+9)%9][sel.col])
			break
		}
	}

	board.refresh()
})

addEventListener('keyup', e => {
	if (e.key == "Shift") {
		shift_up_time = e.timeStamp
	}
})

function update_mode() {
	all_candidate_mode = document.getElementById("all_candidates").checked;
	board.refresh()
}

function handle_update_all_candidates() {
	if (board) {
		board.update_all_marks()
		board.refresh()
	} else {
		alert("must start a game!")
	}
}
/*
	TODO
	candidate should be capitalized if its its own enum
	move recalculate button
	toggle highlightable neighbors
	undo functionallity
*/