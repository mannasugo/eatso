`use strict`;

class Tools {

	constructor () {

		this.call = new XMLHttpRequest;

		this.synonyms = [[`\f`, ``], [`\n`, ``], [`\t`, ``], [`\r`, ``], [`'`, `u0027`], [`"`, `u0022`], [`/`, `u002f`], [`&`, `u0026`]];
	}

	coats (types) {return JSON.stringify(types)}

	plains (Raw)  {

		this.synonyms.slice(4).forEach(Regex => {

			Raw = Raw.replace(new RegExp(Regex[1], `g`), Regex[0]);
		});

		return Raw;
	}

	pull (Arg) {

		this.call.open(`POST`, Arg[0], true);

		this.call.setRequestHeader(`Content-Type`, `application/json`);

		this.call.send(JSON.stringify(Arg[1]));

		return this.call;
	}

  	slim (String) {

		if (!String || String.length < 1 || String.match(/^(\s+)$/)) return;

		return String;
  	}

	typen (coat) {return JSON.parse(coat)}
}

Tools = new Tools();

let Clients = sessionStorage;