`use strict`;

class Event {

	listen (Arg) { 

		(Arg[0].addEventListener) ? Arg[0].addEventListener(Arg[1], Arg[2]) : Arg[0].attachEvent(`on` + Arg[1], Arg[2]);
	}

	getSource (Arg) {

		if (Arg.target) return Arg.target;
	}

	app (Arg) {

		let Catalog = {};

		Arg[0].catalog.forEach(Cat => {Catalog[Cat.ts] = Cat});

		document.querySelectorAll(`.box`).forEach(VAR => {

			this.listen([VAR, `click`, S => {

				let Slot = VAR.parentNode.parentNode;

				if (Catalog[Slot.id].objs.length > 1) {

					View.pop();

					View.DOM([`#modal`, [Models.app.multi(Catalog[Slot.id])]]);

					document.querySelector(`#modal`).style.display = `flex`;
				}
			}]);
		});
	}
}

Event = new Event;