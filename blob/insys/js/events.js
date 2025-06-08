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

		Arg[0].catalog.forEach(Cat => {

			Cat.pay = {};

			Cat.objs.forEach((A) => {Cat.pay[A[0]] = A[1]});

			Catalog[Cat.ts] = Cat;
		});

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

									Box[Slot.id].objs[VAR.parentNode.parentNode.id][1] -= 1;

									if (Box[Slot.id].objs[VAR.parentNode.parentNode.id][1] === 0) {

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

									VAR.nextSibling.innerText = (!Box[Slot.id] || !Box[Slot.id].objs[VAR.parentNode.parentNode.id])? 0: Box[Slot.id].objs[VAR.parentNode.parentNode.id][1];
								}
							}

							if (VAR.getAttribute(`role`) === `+`) {

								if (!Tools.typen(Clients.box)[Slot.id]) {

									Box[Slot.id] = {label: Catalog[Slot.id].label.toString().replace(`_`, ` `), mass: Catalog[Slot.id].mass, objs: {}};

									Clients.box = Tools.coats(Box);
								}

								if (Tools.typen(Clients.box)[Slot.id].objs[VAR.parentNode.parentNode.id]) {

									Box[Slot.id].objs[VAR.parentNode.parentNode.id][1] += 1;

									Clients.box = Tools.coats(Box);
								}

								if (Tools.typen(Clients.box)[Slot.id] && !Tools.typen(Clients.box)[Slot.id].objs[VAR.parentNode.parentNode.id]) {

									Box[Slot.id].objs[VAR.parentNode.parentNode.id] = [Catalog[Slot.id].pay[VAR.parentNode.parentNode.id], 1];

									Clients.box = Tools.coats(Box);
								}

								VAR.previousSibling.innerText = Box[Slot.id].objs[VAR.parentNode.parentNode.id][1];
							}
						}]);
					});

					this.listen([document.querySelector(`#multiClose`), `click`, S => {document.querySelector(`#modal`).style.display = `none`;}]);
				}
			}]);
		});

		this.listen([document.querySelector(`#boxup`), `click`, S => {

			let boxup = () => {

				View.pop();

				View.DOM([`#modal`, [Models.app.boxup()]]);

				document.querySelector(`#modal`).style.display = `flex`;

				if (document.querySelector(`.multibox`)) {

					document.querySelectorAll(`.multibox`).forEach(VAR => {

						this.listen([VAR, `click`, S => {

							let Slot = Tools.typen(VAR.parentNode.id);

							let Box = Tools.typen(Clients.box), float = 0;

							if (VAR.getAttribute(`role`) === `-`) {

								if (Tools.typen(Clients.box)[Slot[0]] && Tools.typen(Clients.box)[Slot[0]].objs[Slot[1]]) {

									Box = Tools.typen(Clients.box);

									Box[Slot[0]].objs[Slot[1]][1] -= 1;

									if (Box[Slot[0]].objs[Slot[1]][1] === 0) {

										let Objs = {};

										for (let obj in Box[Slot[0]].objs) {

											if (obj !== Slot[1]) Objs[obj] = Box[Slot[0]].objs[obj];
										}

										Box[Slot[0]].objs = Objs;

										let Objects = {};

										for (let item in Box) {

											let objs = 0

											for (let obj in Box[item].objs) {objs++}

											if (objs > 0) Objects[item] = Box[item];
										}

										Box = Objects;

										Clients.box = Tools.coats(Box);

										boxup();
									}

									Clients.box = Tools.coats(Box);

									VAR.nextSibling.innerText = (!Box[Slot[0]] || !Box[Slot[0]].objs[Slot[1]])? 0: Box[Slot[0]].objs[Slot[1]][1];

									VAR.parentNode.parentNode.querySelector(`.sum`).innerText = (!Box[Slot[0]] || !Box[Slot[0]].objs[Slot[1]])? 0: parseFloat(Box[Slot[0]].objs[Slot[1]][1]*Box[Slot[0]].objs[Slot[1]][0]).toFixed(2);
								}
							}

							if (VAR.getAttribute(`role`) === `+`) {

								if (Tools.typen(Clients.box)[Slot[0]].objs[Slot[1]]) {

									Box[Slot[0]].objs[Slot[1]][1] += 1;

									Clients.box = Tools.coats(Box);
								}

								VAR.previousSibling.innerText = Box[Slot[0]].objs[Slot[1]][1];

								VAR.parentNode.parentNode.querySelector(`.sum`).innerText = parseFloat(Box[Slot[0]].objs[Slot[1]][1]*Box[Slot[0]].objs[Slot[1]][0]).toFixed(2);
							}

							for (let item in Box) {

								for (let obj in Box[item].objs) {float += parseFloat(Box[item].objs[obj][1]*Box[item].objs[obj][0])}
							}

							document.querySelector(`#total`).innerText = float.toFixed(2);
						}]);
					});
				}

				this.listen([document.querySelector(`#paymug`), `click`, S => {
				
					if (!Clients.mug) {

						View.pop();

						View.DOM([`#modal`, [Models.app.inputMug([0])]]);

						this.mug();
					}
				}]);

				this.listen([document.querySelector(`#boxClose`), `click`, S => {document.querySelector(`#modal`).style.display = `none`}]);
			}

			boxup();
		}]);
	}

	mug () {

		if (document.querySelector(`#modalMugin`)) {

			this.listen([document.querySelector(`#modalMugin`), `click`, S => {

				View.pop();

				View.DOM([`#modal`, [Models.app.inputMug([2])]]);

				this.mug()
			}]);
		}

		if (document.querySelector(`#modalMugup`)) {

			this.listen([document.querySelector(`#modalMugup`), `click`, S => {

				View.pop();

				View.DOM([`#modal`, [Models.app.inputMug([0])]]);

				this.mug()
			}]);
		}

		if (document.querySelector(`#emailAvail`)) {

			this.listen([document.querySelector(`#emailAvail`), `click`, S => {

				if (!Tools.slim(document.querySelector(`input#email`).value) === true) return;

				let XHR = Tools.pull([
					`/json/web`, {email: document.querySelector(`input#email`).value, flag: `emailAvail`, pull: `mug`}]);

				document.querySelector(`input#email`).value = ``;

				XHR.onload = () => {

					let Obj = Tools.typen(XHR.response);

					if (Obj.email) {

						View.pop();

						View.DOM([`#modal`, [Models.app.inputMug([1])]]);

						this.listen([document.querySelector(`#saltAvail`), `click`, S => {

							if (!Tools.slim(document.querySelector(`input#lock`).value) === true) return;

							let XHR = Tools.pull([
								`/json/web`, {email: Obj.email, salt: document.querySelector(`input#lock`).value, flag: `saltAvail`, pull: `mug`}]);

							XHR.onload = () => {

								let Obj = Tools.typen(XHR.response);

								if (Obj && Obj.md) {

									Clients.mug = Obj.md;

									window.location = window.location;
								}
							}
						}]);
					}
				}
			}]);
		}

		if (document.querySelector(`#emailSalt`)) {

			this.listen([document.querySelector(`#emailSalt`), `click`, S => {

				if (!Tools.slim(document.querySelector(`input#email`).value) === true || !Tools.slim(document.querySelector(`input#salt`).value) === true) return;

				let XHR = Tools.pull([
					`/json/web`, {
						email: document.querySelector(`input#email`).value, flag: `emailSalt`, pull: `mug`, salt: document.querySelector(`input#salt`).value}]);

				XHR.onload = () => {

					let Obj = Tools.typen(XHR.response);

					if (Obj && Obj.md) {

						Clients.mug = Obj.md;

						window.location = window.location;
					}
				}
			}]);
		}
	}
}

Event = new Event;