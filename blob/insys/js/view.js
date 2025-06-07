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

	app: {

		a: (Obj) => {

			let DOM = [[]];

			Obj.catalog.forEach(Cat => {

				if (new Date().valueOf() > DAY + parseFloat(Cat.avail[0])*60*60000 && new Date().valueOf() < DAY + parseFloat(Cat.avail[1])*60*60000) {
				
					DOM[0].push([`div`, {id: Cat.ts, style: {[`margin-bottom`]: `${24}px`}}, 
						[
							[`img`, {src: `blob/catalog/${Cat.img}`, style: {[`margin-bottom`]: `${8}px`}}],
							[`div`, {class: `_gxM`, style: {[`font-family`]: ``,[`font-size`]: `${12.88}px`, [`font-weight`]: 600}}, 
								[[`span`, {style: {[`align-items`]: `top`, color: `#7d7d7d`, display: `flex`, [`font-size`]: `${7.88}px`, [`margin-right`]: `${4}px`}}, `KES`], [`span`, {}, `${parseFloat(Cat.objs[0][1]).toFixed(2)}`]]],
							[`span`, {style: {[`font-family`]: ``,[`font-size`]: `${11}px`, margin: `${4}px ${0}`, overflow: `hidden`, [`text-transform`]: `capitalize`, [`text-overflow`]: `ellipsis`, [`white-space`]: `nowrap`}}, Cat.label.replaceAll(`_`, ` `)],
							[`span`, {style: {[`font-size`]: `${10}px`}}, Cat.objs[0][0] + Cat.mass.toLowerCase()],
							[`div`, {class: `_geQ`, style: {background: `#000000e3`, color: `#fff`, position: `absolute`, right: 0}}, 
								[
									[`svg`, {class: `box-`, viewbox: `0 0 24 24`, style: {cursor: `pointer`, display: `none`, height: `${8}px`, margin: `${8}px`, width: `${8}px`}}, 
										[[`path`, {fill: `#000`, stroke: `#fff`, [`stroke-width`]: 1, d: `M0 12 24 12 `}]]], 
									[`span`, {style: {display: `none`, [`font-family`]: `qb`, [`font-size`]: `${10.88}px`, margin: `${8}px ${0}`}}, `0`],
									[`svg`, {class: `box`, viewbox: `0 0 24 24`, style: {cursor: `pointer`, height: `${11}px`, margin: `${6}px`, width: `${11}px`}}, 
										[[`path`, {fill: `#000`, stroke: `#fff`, [`stroke-width`]: 1, d: `M0 12 24 12 M12 0 12 24`}]]]]]]])
				}
			});

			return [
				`main`, {id: `app`, class: `_tY0`, style: {background: `#fff`, color: `#000`, [`font-family`]: `intext`, [`font-size`]: `${12}px`, height: `${100}%`}}, 
					[
						[`div`, {style: {background: `#fff`, [`border-bottom`]: `${1}px solid #ececec`, height: `${48}px`, padding: `${0}px ${24}px`, position: `fixed`, width: `${100}%`, [`z-index`]: 11}}, 
							[[`div`, {class: `_gxM _geQ`}, 
								[
									[`span`, {style: {[`background-image`]: `url(blob/insys/png/eatso.png)`, [`background-size`]: `${20}px`, height: `${20}px`, width: `${20}px`}}], 
									//[`div`, {class: `_eYG`, style: {[`margin-left`]: `${24}px`}}, [[`span`, {style: {[`font-family`]: `es`, [`font-size`]: `${12}px`, [`font-weight`]: 600}}, `eatso`]]],  
									[`div`, {class: `_eYG`}, []], 
									[`div`, {class: `_gZz`, style: {}}, 
										[
											[`svg`, {id: `boxup`, viewbox: `0 0 24 24`, style: {cursor: `pointer`, height: `${24}px`, width: `${24}px`}}, 
												[[`g`, {style: {fill: `none`, stroke: `#000`, [`stroke-width`]: 1}}, 
													[[`path`, {fill: `#fff`, d: `M0 2 3 2 8 19 16 19`}], [`circle`, {r: 1.9, cx: 7.5, cy: 20.9}], [`circle`, {r: 1.9, cx: 16.5, cy: 20.9}], [`path`, {fill: `none`, d: `M6 13 17 13 20 4 6 4`}]]]]]]]]]]], 
						[`div`, {style: {margin: `${71}px ${24}px`}}, 
							[
							//[`section`, {}, [[`span`, {style: {[`font-family`]: `qb`, [`text-transform`]: `uppercase`}}, `popular this hour`], [`div`, {style: {[`margin-top`]: `${24}px`}}, DOM[0]]]],
								[`section`, {}, [[`span`, {style: {[`font-family`]: `qb`, [`text-transform`]: `uppercase`}}, `order it again`], [`div`, {style: {[`margin-top`]: `${24}px`}}, DOM[0]]]]]], 
						[`div`, {id: `modal`, style: {background: `rgba(${217}, ${217}, ${217}, ${0.8})`, bottom: 0, display: `none`, position: `fixed`, top: 0, width: `${100}%`, [`z-index`]: 18}}]]];
		}, 

		boxup: () => {

			if (!Clients.box) {Clients.box = Tools.coats({})}

			let DOM = [[], []];

			for (let item in Tools.typen(Clients.box)) {

				DOM[1] = [];

				for (let sub in Tools.typen(Clients.box)[item].objs) {

					DOM[1].push([`div`, {class: `_gxM _geQ`, style: {margin: `${4}px ${0}`}}, 
						[
							[`span`, {style: {[`font-size`]: `${11}px`, [`font-weight`]: 600, [`text-transform`]: `lowercase`}}, `${sub}${Tools.typen(Clients.box)[item].mass}`], 
							[`div`, {class: `_gZz`}, 
								[[`div`, {}, 
									[
										[`div`, {class: `_gxM`, style: {[`font-size`]: `${12.88}px`, [`font-weight`]: 600, [`justify-content`]: `end`, [`margin`]: `${4}px ${5}px ${0} ${0}`}}, 
											[[`span`, {style: {[`align-items`]: `top`, color: `#7d7d7d`, display: `flex`, [`font-size`]: `${7.88}px`, [`margin-right`]: `${4}px`}}, `KES`], [`span`, {class: `sum`}, `${parseFloat(parseFloat(Tools.typen(Clients.box)[item].objs[sub][0])*parseFloat(Tools.typen(Clients.box)[item].objs[sub][1])).toFixed(2)}`]]], 
										[`div`, {id: Tools.coats([item, sub]), class: `_gxM _geQ`, style: {[`margin-top`]: `${4}px`}}, 
											[
												[`svg`, {class: `multibox`, role: `-`, viewbox: `0 0 24 24`, style: {cursor: `pointer`, height: `${20}px`, width: `${20}px`}}, 
													[[`text`, {[`font-size`]: `${16}px`, [`stroke-width`]: 1, [`text-anchor`]: `middle`, x: 12, y: `16`}, `-`]]], 
												[`span`, {style: {margin: `${0} ${12}px`, [`text-align`]: `center`, width: `${36}px`}}, (!Clients.box || !Tools.typen(Clients.box)[item] || !Tools.typen(Clients.box)[item].objs[sub])? `0`: `${Tools.typen(Clients.box)[item].objs[sub][1]}`],
												[`svg`, {class: `multibox`, role: `+`, viewbox: `0 0 24 24`, style: {cursor: `pointer`, height: `${20}px`, width: `${20}px`}}, 
													[[`text`, {[`font-size`]: `${16}px`, [`stroke-width`]: 1, [`text-anchor`]: `middle`, x: 12, y: `16`}, `+`]]]]]]]]]]]);
				}

				DOM[0].push([`div`, {style: {margin: `${10}px ${0}px`}}, 
					[
						[`div`, {class: `_gxM _geQ`}, 
							[
								[`img`, {src: `blob/catalog/${item}.png`, style: {[`width`]: `${36}px`}}], 
								[`div`, {class: `_eYG`, style: {[`margin-right`]: `${6}px`}}, 
									[[`span`, {style: {[`font-size`]: `${13}px`, [`text-transform`]: `capitalize`}}, Tools.typen(Clients.box)[item].label]]]]], 
						[`div`, {style: {[`margin-left`]: `${48}px`}}, DOM[1]]]]);
			}//#eb6538

			return [`div`, {style: {background: `#fff`, bottom: 0, left: 0, margin: `${48}px auto ${0}`, [`max-width`]: `${600}px`, position: `absolute`, right: 0, top: 0, width: `${100}%`}}, 
				[
					[`div`, {style: {width: `${100}%`}}, 
						[[`div`, {class: `_gxM _geQ`, style: {[`border-bottom`]: `${1}px solid #ececec`, padding: `${10}px ${16}px`}}, 
							[ 
								[`div`, {style: {[`font-weight`]: 300}}, 
									[
										[`span`, {style: {[`font-size`]: `${13}px`, [`text-transform`]: `capitalize`}}, `Review Cart`],
										[`span`, {style: {color: `#9d9d9d`, [`font-size`]: `${11}px`, [`margin-top`]: `${3}px`}}, `eatSo`]]], 
								[`div`, {class: `_gZz`}, 
									[[`svg`, {id: `boxClose`, viewbox: `0 0 24 24`, style: {cursor: `pointer`, height: `${12}px`, width: `${12}px`}}, 
										[[`path`, {fill: `none`, stroke: `#000`, [`stroke-width`]: 2, d: `M0 6 12 18 24 6`}]]]]]]], 
						[`div`, {style: {height: `calc(100vh)`, [`max-height`]: `calc(100vh - 188px)`, [`overflow-y`]: `scroll`, padding: `${0}px ${16}px`}}, DOM[0]]]], 
					[`div`, {style: {background: `#fff`, bottom: 0, position: `absolute`, width: `${100}%`}}, 
						[[`div`, {style: {margin: `${24}px`}}, 
							[[`a`, {id: ``, href: `javascript:;`, style: {background: `#eb6538`, color: `#fff`, [`font-size`]: `${13}px`, [`font-weight`]: 300, [`padding`]: `${12}px`, [`text-align`]: `center`, width: `${100}%`}}, `proceed to checkout`]]]]]]]
		},

		multi: (Obj) => {

			let DOM = [[]];

			Obj.objs.forEach(Value => {

				DOM[0].push([`div`, {id: Value[0], class: `_gxM _geQ`, style: {margin: `${6}px ${0}`}}, 
					[
						[`div`, {}, 
							[
								[`span`, {style: {[`font-size`]: `${11}px`, [`font-weight`]: 600}}, Value[0] + Obj.mass.toLowerCase()],
								[`div`, {class: `_gxM`, style: {[`font-family`]: ``, [`font-size`]: `${12.88}px`, [`margin-top`]: `${4}px`}}, 
									[[`span`, {style: {[`align-items`]: `top`, color: `#7d7d7d`, display: `flex`, [`font-size`]: `${7.88}px`, [`margin-right`]: `${4}px`}}, `KES`], [`span`, {}, `${parseFloat(Value[1]).toFixed(2)}`]]]]], 
						[`div`, {class: `_gZz`}, 
							[
								[`svg`, {class: `multibox`, role: `-`, viewbox: `0 0 24 24`, style: {cursor: `pointer`, height: `${20}px`, width: `${20}px`}}, 
									[[`text`, {[`font-size`]: `${16}px`, [`stroke-width`]: 1, [`text-anchor`]: `middle`, x: 12, y: `16`}, `-`]]], 
								[`span`, {style: {margin: `${0} ${12}px`, [`text-align`]: `center`, width: `${36}px`}}, (!Clients.box || !Tools.typen(Clients.box)[Obj.ts] || !Tools.typen(Clients.box)[Obj.ts].objs[Value[0]])? `0`: `${Tools.typen(Clients.box)[Obj.ts].objs[Value[0]][1]}`],
								[`svg`, {class: `multibox`, role: `+`, viewbox: `0 0 24 24`, style: {cursor: `pointer`, height: `${20}px`, width: `${20}px`}}, 
									[[`text`, {[`font-size`]: `${16}px`, [`stroke-width`]: 1, [`text-anchor`]: `middle`, x: 12, y: `16`}, `+`]]]]]]]);
			});

			return [`div`, {style: {bottom: 0, left: 0, margin: `auto`, [`max-width`]: `${360}px`, position: `absolute`, right: 0, width: `${100}%`}}, 
				[[`div`, {style: {background: `#fff`, width: `${100}%`}}, 
					[
						[`div`, {class: `_gxM _geQ`, style: {[`border-bottom`]: `${1}px solid #ececec`, padding: `${10}px ${16}px`}}, 
							[
								[`img`, {src: `blob/catalog/${Obj.img}`, style: {[`width`]: `${36}px`}}], 
								[`div`, {class: `_eYG`, style: {[`margin-right`]: `${6}px`}}, 
									[
										[`span`, {style: {[`font-size`]: `${13}px`, [`text-transform`]: `capitalize`}}, Obj.label.replaceAll(`_`, ` `)],
										[`span`, {style: {color: `#9d9d9d`, [`font-family`]: ``, [`font-size`]: `${9}px`, [`margin-top`]: `${6}px`}}, `${Obj.objs.length} OPTIONS AVAILABLE`]]], 
								[`div`, {class: `_gZz`}, 
									[[`svg`, {id: `multiClose`, viewbox: `0 0 24 24`, style: {cursor: `pointer`, height: `${12}px`, width: `${12}px`}}, 
										[[`path`, {fill: `none`, stroke: `#000`, [`stroke-width`]: 2, d: `M0 6 12 18 24 6`}]]]]]]], 
						[`div`, {style: {padding: `${10}px ${16}px`}}, DOM[0]]]]]];
		}
	}
}

View = new View;