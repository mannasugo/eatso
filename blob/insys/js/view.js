`use strict`;

const DAY = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00`).valueOf();

class View {

	constructor() {this.appendString = ``}

	ModelDOM(Model) {

		if (typeof Model !== `object`) return;

		Model.forEach(Obj => {

			let a = Obj[0], z, last;

			z = a; 

				if (a === `html`) a = `!doctype html><html`;

				this.appendString += `<` + a;
				
				for (let meta in Obj[1]) {

					let value = ``;

					if (meta === `style`) {

						for (let style in Obj[1][meta]) {

							value += `${style}:${Obj[1][meta][style]};`
						}
					}

					else value = Obj[1][meta];

					this.appendString += ` ${meta}='${value}'`;
				}

				this.appendString += `>`;
				
				if (Obj[2]) {

					if (typeof Obj[2] === `object`) this.ModelDOM(Obj[2]);

					else if (typeof Obj[2] === `string`) this.appendString += Obj[2];
				}

				let Queer = [`img`, `input`, `meta`];

				if (!Queer.indexOf(z) > -1) this.appendString += `</` + z + `>`;
		});

		return Tools.plains(this.appendString);
	}

	DOM(Arg) { document.querySelector(Arg[0]).innerHTML = this.ModelDOM(Arg[1]) }

	pop () {this.appendString = ``};
}

let Models = {

	app: (Obj) => {

		let DOM = [[]];

		Obj.catalog.forEach(Cat => {

			if (new Date().valueOf() > DAY + parseFloat(Cat.avail[0])*60*60000 && new Date().valueOf() < DAY + parseFloat(Cat.avail[1])*60*60000) {
				
				DOM[0].push([`div`, {style: {[`margin-bottom`]: `${24}px`}}, 
					[
						[`img`, {src: `blob/catalog/${Cat.img}`, style: {[`margin-bottom`]: `${8}px`}}],
						[`span`, {style: {[`font-family`]: `qb`,[`font-size`]: `${10.88}px`}}, `KES${parseFloat(Cat.objs[0][1]).toFixed(2)}`],
						[`span`, {style: {[`font-family`]: `es`,[`font-size`]: `${12}px`, [`text-transform`]: `capitalize`}}, Cat.label.replaceAll(`_`, ` `)],
						[`span`, {style: {[`font-size`]: `${10}px`}}, Cat.objs[0][0] + Cat.mass.toLowerCase()]]])
			}
		});

		return [
			`main`, {id: `app`, class: `_tY0`, style: {background: `#fff`, color: `#000`, [`font-family`]: `es`, [`font-size`]: `${12}px`, height: `${100}%`}}, 
				[
					[`div`, {style: {[`border-bottom`]: `${1}px solid #ececec`, height: `${48}px`, padding: `${0}px ${24}px`, position: `fixed`, width: `${100}%`, [`z-index`]: 11}}, 
						[[`div`, {class: `_gxM _geQ`}, 
							[
								[`span`, {style: {[`background-image`]: `url(blob/insys/png/eatso.png)`, [`background-size`]: `${20}px`, height: `${20}px`, width: `${20}px`}}], 
								//[`div`, {class: `_eYG`, style: {[`margin-left`]: `${24}px`}}, [[`span`, {style: {[`font-family`]: `es`, [`font-size`]: `${12}px`, [`font-weight`]: 600}}, `eatso`]]],  
								[`div`, {class: `_eYG`}, []], 
								[`div`, {class: `_gZz`, style: {[`font-size`]: `${12}px`, [`font-weight`]: 600}}, 
									[
										//[`a`, {class: `_gxM _geQ`, href: `/u/wallet/`, style: {background: `blue`, color: `#fff`, display: `flex`, [`font-weight`]: 600, padding: `${4}px ${12}px`, [`white-space`]: `nowrap`}}, [[`span`, {class: `v202204282015`, style: {height: `${20}px`, [`margin-right`]: `${8}px`, width: `${20}px`}}], [`span`, {style: {[`marin-bottom`]: `${2}px`}}, `Deposit`]]],
										(Clients.mug)? []: [`a`, {href: `/signin`, style: {background: `#ffffff1c`, color: `#fff`, [`font-weight`]: 300, [`margin-left`]: `${8}px`, padding: `${6}px ${12}px`, [`white-space`]: `nowrap`}}, `signin`]]]]]]], 
					[`div`, {style: {margin: `${71}px ${24}px`}}, 
						[
							//[`section`, {}, [[`span`, {style: {[`font-family`]: `qb`, [`text-transform`]: `uppercase`}}, `popular this hour`], [`div`, {style: {[`margin-top`]: `${24}px`}}, DOM[0]]]],
							[`section`, {}, [[`span`, {style: {[`font-family`]: `qb`, [`text-transform`]: `uppercase`}}, `order it again`], [`div`, {style: {[`margin-top`]: `${24}px`}}, DOM[0]]]]]]]];

	}
}

View = new View;