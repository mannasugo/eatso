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

					document.querySelectorAll(`.multibox`).forEach(VAR => {

						this.listen([VAR, `click`, S => {

							if (!Clients.box) {Clients.box = Tools.coats({})}

							let Box = Tools.typen(Clients.box);

							if (VAR.getAttribute(`role`) === `-`) {

								if (Tools.typen(Clients.box)[Slot.id] && Tools.typen(Clients.box)[Slot.id].objs[VAR.parentNode.parentNode.id]) {

									Box = Tools.typen(Clients.box);

									Box[Slot.id].objs[VAR.parentNode.parentNode.id] -= 1;

									if (Box[Slot.id].objs[VAR.parentNode.parentNode.id] === 0) {

										let Objs = {};

										for (let obj in Box[Slot.id].objs) {

											if (obj !== VAR.parentNode.parentNode.id) Objs[obj] = Box[Slot.id].objs[obj];
										};

										Box[Slot.id].objs = Objs;

										let Objects = {};

										for (let item in Box) {

											let objs = 0

											for (let obj in Box[item].objs) {objs++}

											if (objs > 0) Objects[item] = Box[item];
										}

										Box = Objects;
									}

									Clients.box = Tools.coats(Box);

									VAR.nextSibling.innerText = (!Box[Slot.id] || !Box[Slot.id].objs[VAR.parentNode.parentNode.id])? 0: Box[Slot.id].objs[VAR.parentNode.parentNode.id];
								}
							}

							if (VAR.getAttribute(`role`) === `+`) {

								if (!Tools.typen(Clients.box)[Slot.id]) {

									Box[Slot.id] = {objs: {}};

									Clients.box = Tools.coats(Box);
								}

								if (Tools.typen(Clients.box)[Slot.id].objs[VAR.parentNode.parentNode.id]) {

									Box[Slot.id].objs[VAR.parentNode.parentNode.id] += 1;

									Clients.box = Tools.coats(Box);
								}

								if (Tools.typen(Clients.box)[Slot.id] && !Tools.typen(Clients.box)[Slot.id].objs[VAR.parentNode.parentNode.id]) {

									Box[Slot.id].objs[VAR.parentNode.parentNode.id] = 1;

									Clients.box = Tools.coats(Box);
								}

								VAR.previousSibling.innerText = Box[Slot.id].objs[VAR.parentNode.parentNode.id];
							}
						}]);
					});

					this.listen([document.querySelector(`#multiClose`), `click`, S => {

						document.querySelector(`#modal`).style.display = `none`;
					}]);
				}
			}]);
		});
	}
}

Event = new Event;