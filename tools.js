`use strict`;

const {createConnection} = require(`mysql`);

const { mkdir, readFile, readFileSync, stat, writeFileSync } = require(`fs`);

const { createHash } = require(`crypto`);

const RQ = require(`request`);

const hold = new Date(`1996-01-20`).valueOf();

const DAY = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`).valueOf();

class Sql {
	
	constructor (Arg) {

		this.credentials = Arg[0];
	}

	Sql (Arg) {return createConnection(this.credentials).query(Arg[0], (A, B, C) => Arg[1]([A, B, C]))}

	pulls (Arg) {

		this.credentials.database = `eatso`;

		this.Sql([readFileSync(`bin/tables.sql`, {encoding: `utf8`}), (Raw) => {

			let Fields = {};

			Raw[2].forEach((Field, field) => {

				Fields[Field[0].table] = [[], {}];

				Raw[1][field].forEach(Obj => {

					Fields[Field[0].table][0].push(JSON.parse(Obj.json));

					Fields[Field[0].table][1][JSON.parse(Obj.json).md] = JSON.parse(Obj.json);
				});
			});

			Arg(Fields);
		}]);
	}

    places (Arg) {

        this.credentials.database = `eatso`;

        this.Sql([{
            sql: `update ${Arg[0]} set json = ? where json = ?`,
            values: [JSON.stringify(Arg[1]), JSON.stringify(Arg[2])]}, (Raw) => Arg[3](Raw)]);
    }

	putlist (Arg) {

		this.credentials.database = `eatso`;

		let Put = [];

		Arg[1].forEach(MD => {

			Put.push([new Tools().coats(MD)]);
		});

		this.Sql([{
			sql: `insert into ?? (json) values?`,
			values: [Arg[0], Put]}, (Raw) => Arg[2](Raw)]);			
	}

	puts (Arg) {

		this.credentials.database = `eatso`;

		this.Sql([{
			sql: `insert into ?? set ?`,
			values: [Arg[0], {json: JSON.stringify(Arg[1])}]}, (Raw) => Arg[2](Raw)]);			
	}
}

class Tools {

	constructor () {}

	coats (types) {return JSON.stringify(types)}

	csv () {

		let Obj = [], 

			CSV = readFileSync(`bin/csv/inventory.csv`, {encoding: `utf8`});

		CSV = CSV.split(`\n`); 

		CSV.forEach(Value => {

			Value = Value.split(`,`);

			let Vols = [];

			Value[3].split(`-`)[1].split(`/`).forEach(Vol => {

				Vols.push(Vol.split(`_`))
			});

			Obj.push({
				avail: Value[1].split(`-`),
				img: Value[0] + `.${Value[2]}`,
				label: Value[4].toLowerCase(),
				mass: Value[3].split(`-`)[0],
				objs: Vols,
				ts: parseFloat(Value[0])
			});
		});console.log(Obj)

		writeFileSync(`bin/json/catalog.json`, this.coats(Obj));
	}			

	typen (coat) {return JSON.parse(coat)}
}

module.exports = {
	
	Sql : new Sql([{
		host: `127.0.0.1`,
		user: `root`,
		password: `Mann2asugo`,
		multipleStatements: true
	}]),

	Tools : new Tools()
}