`use strict`;

const { readdir, readFile, readFileSync, createReadStream, mkdir, stat, writeFile, writeFileSync } = require(`fs`);

const { createHash } = require(`crypto`);

const { Constants, Sql, Tools } = require(`./tools`);

const hold = new Date(`1996-01-20`).valueOf();

const DAY = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`).valueOf(); 

class Route {

	Call (Arg) {

		let url = (`./${Arg[0].url}`).replace(`//`, `/`).replace(/%(...)/g, (match, hex) => {

			return String.fromCharCode(parseInt(hex, 16));
		});

		let State = url.split(`/`);

		if (Arg[0].method === `GET`)  {

			if (State[1] === `favicon.ico`) {

				let File = createReadStream(`bin/webclient/get/png/eatso.png`);

				Arg[1].writeHead(200, {[`Content-Type`]: `image/png`});

				File.on(`data`, Arg[1].write.bind(Arg[1]));

				File.on(`close`, () => Arg[1].end());
			}

			else {

				let DOM = readFileSync(`bin/app.html`, {encoding: `utf8`});

				let CSS = readFileSync(`bin/app.css`, {encoding: `utf8`});

				DOM = DOM.replace(/`css`/, CSS);

				Arg[1].writeHead(200, {[`Content-Type`]: `text/html`});

				Arg[1].end(DOM);
			}
		}

		else if (Arg[0].method == `POST`) {

			let blob = new Buffer.alloc(+Arg[0].headers[`content-length`]);

			let Pull = ``;

			let allocate = 0;

			Arg[0].on(`data`, (Data) => {

				Data.copy(blob, allocate);

			 	allocate += Data.length;

				Pull += Data;

			}).on(`end`, () => {

				let Pulls;

				if (Pull[0] === `{`) Pulls = JSON.parse(Pull);

				if (State[1] === `json`) {

					Arg[1].setHeader(`Content-Type`, `application/json`);

					if (State[2] === `web`) {

						Sql.pulls(Raw => {

							if (Pulls.pull === `app`) {

								let Objs = Tools.typen(readFileSync(`bin/json/catalog.json`, {encoding: `utf8`}));

								/*

								let Catalog = [];

								Objs.forEach(Obj => {

									if (new Date())
								});

								*/

								Arg[1].end(Tools.coats({catalog: Objs}));
							}

							if (Pulls.pull === `mug`) { 

								if (Pulls.flag === `emailAvail`) {

									let Mail = [];

									Raw.mugs[0].forEach(Mug => {

										if (Mug.email === Pulls.email) Mail.push(Pulls.email);
									});

									if (Mail.length === 0) {

										Arg[1].end(Tools.coats({email: Pulls.email}));
									}
								}

								if (Pulls.flag === `emailSalt`) {

									let Obj = [];

									Raw.mugs[0].forEach(Mug => {

										if (Mug.email === Pulls.email 
											&& Mug.lock === createHash(`md5`).update(`${Pulls.salt}`, `utf8`).digest(`hex`)) {

											Obj = [Mug.md];
										}
									});

									if (Obj.length > 0) {

										Arg[1].end(Tools.coats({md: Obj[0]}));
									}
								}

								if (Pulls.flag === `saltAvail`) {

									let Mail = [];

									Raw.mugs[0].forEach(Mug => {

										if (Mug.email === Pulls.email) Mail.push(Pulls.email);
									});

									if (Mail.length === 0) {

										let TZ = new Date().valueOf();

										Sql.puts([`mugs`, {
											email: Pulls.email,
											lock: createHash(`md5`).update(Pulls.salt, `utf8`).digest(`hex`),
											md: createHash(`md5`).update(`${TZ}`, `utf8`).digest(`hex`),
											stamp: TZ
										}, (sqlObj) => {

											Arg[1].end(Tools.coats({md: createHash(`md5`).update(`${TZ}`, `utf8`).digest(`hex`)}));
										}]);
									}
								}
							}
						});
					}
				}
			});
		}
	}

	io () {}
}

module.exports = new Route();