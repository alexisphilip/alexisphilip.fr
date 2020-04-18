
/**
 * ColorPicker class.
 *
 * La classe principale du color picker. Elle permet son initialisation et son contrôle.

 * Color picker
 *
 * Le color picker est construit de cette manière ci : en haut à droite, le blanc, en haut à gauche la teinte, puis
 * sur toute la longueur en bas, le noir. Une bare de sélection de la teinte se trouve en dessous du color picker.
 *
 * Il y a deux inputs / outputs. Il est possible d'ajouter une couleur en format RGB ou HEX pour que le color picker
 * l'interprête.

 * CMD
 * 
 * Le CMD est caché au chargement. Il est activable en écrivant "cmd" dans l'input "HEX" du color picker.
 * 
 * Le CMD peut exécuter diverses commandes. Il utilise des cookies pour stocker les préférences de l'utilisateur.
 * E.g., si l'utilisateur utilise un thème ou souhaite que le CMD soit chargé lors du chargement de la page, ces
 * informations seront stockées dans des cookies. À tout moment l'utilisateur peut consulter ou supprimer ces cookies.
 */


/* À faire :

- CMD : régler problème clignotement curseur
- CMD : pouvoir régler taille du CMD avec cookies et ajuster la dernière ligne.
- CMD : list scheme dynamically
- CMD : afficher dynamiquement les espaces avec une fonction

- URL : RECUPERER PARAMETRE URL

- input copy on click

- faire toutes les convertions correctes (tout tester) HSL, RGB, HEX
- ajouter les conversions dans class Conversions

- validateInput : HEX (si entre A et G ou 0 et 9).
- si on écrit 3 chiffres on met directement ", ".
- si on écrit "25 105 13" il comprend la sépration des espaces.
- régler les problèmes de "split()" (pour qu'il n'y a plus d'erreurs dans la console).

- rgbToHex : (si 3 ou 6 caractères)

- régler problème de proportionalité dans la palette, dernière couleur négatif, etc

- régler le problème de l'offset et du -1 dans le drag n drop
*/

class ColorPicker
{
	constructor()
	{
		// Nouvel objet CMD.
		this.cmd = new Cmd;

		// Canvas color picker.
		this.canvas_cp;
		this.ctx_cp;
		this.canvas_cp_width = 400;
		this.canvas_cp_height = 250;

		// Canvas teinte picker.
		this.canvas_tp;
		this.ctx_tp;
		this.canvas_tp_width = 570;
		this.canvas_tp_height = 20;

		// Résolution du color picker (taille des carrés).
		this.square_size = 5;

		// Curseur de la palette (en haut à gauche, pour la teinte maximale).
		this.palette_cursor = document.querySelector(".palette-pointer");
		this.palette_cursor_offset = this.palette_cursor.clientWidth / 2;
		this.palette_cursor_x = 0;
		this.palette_cursor_y = 0;

		// Curseur du sélecteur de teinte.
		this.hue_cursor = document.querySelector(".hue-pointer");
		this.hue_cursor_offset = this.hue_cursor.clientWidth / 2;
		this.hue_cursor_x = 0;

		// Sélection des inputs / outputs.
		this.output_rgb = document.querySelector(".output-rgb");
		this.output_hex = document.querySelector(".output-hex");
		this.output_hsl = document.querySelector(".output-hsl");
		this.output_cursor_palette_x = document.querySelector(".cursor-x");
		this.output_cursor_palette_y = document.querySelector(".cursor-y");
		this.output_palette_color = document.querySelector(".output-color");
		this.output_exection_time = document.querySelector(".execution-time");

		// Couleur sélectionnée.
		this.selected_primary = ""; // Couleur string primaire.
		this.selected_hex = ""; 	// Couleur string HEX.
		this.selected_rgb = [];		// Couleur array RGB.
		this.selected_hsl = [];		// Couleur array HSL.
	}




	/***** INITIALISATION *****/

	/**
	 * Lancement des fonctions pour initaliser correctement le colorpicker.
	 */

	start()
	{
		var t0,
			t1,
			start_color = [],
			squaresize,
			cmd_onload,
			scheme_name;

		// Début du calcul de temps d'exécution.
		t0 = performance.now();

		// Couleur de départ.
		// start_color = [50, 160, 160];

		// Start color random.
		for (var i = 0; i < 3; i++) {
			start_color.push(Math.floor(Math.random() * Math.floor(255)));
		}

		// Assigne une nouvelle taille en pixel des carrés de la palette.
		squaresize = this.getCookie("squaresize");
		if (squaresize) this.square_size = squaresize;

		// Assigne la couleur de start aux variables globales des couleurs.
		this.setColors(start_color);

		// Initialise les canvas.
		this.createCanvases();

		// Dessine la bare de teintes et récupère la position où doit se positionner le curseur.
		this.drawHue("find");

		// Dessine la palette à partir de la couleur primaire (teinte) et récupère la position où doit se positionner le curseur.
		this.drawPalette(this.selected_primary, "find");

		// Affichage des couleurs des deux curseurs.
		this.outputCursorBackground(start_color, "palette");
		this.outputCursorBackground(this.selected_primary, "hue");

		// Autorise les transitions des curseurs.
		this.transitionManager(true, "palette");
		this.transitionManager(true, "hue");

		// Affichage des valeurs RGB et HEX de la couleur.
		this.outputValues("all");

		// Vérifie l'URL pour voir si une couleur a été donnée en paramètre.
		this.checkURL();

		// POUR LA DÉMO LE CMD EST CHARGÉ DÈS LE DÉBUT.
		this.cmd.start();

		// Affiche le terminal et le démarre si le cookie existe ou si il l'autorise.
		// cmd_onload = this.getCookie("onload");
		// if (cmd_onload && cmd_onload != "false") this.cmd.start();
		
		// Charge le thème depuis un cookie si il existe.
		scheme_name = this.getCookie("scheme");
		if (scheme_name) this.setColorScheme("build", scheme_name);

		// Lance l'écoute à la fin de l'execution.
		this.listener();
	
		// Ajout du temps d'execution.
		t1 = performance.now();
		this.output_exection_time.innerHTML = "Loading: " + (Math.round((t1 - t0) * 100) / 100) + " ms";
	}



	/***** CRÉATION DES CANVAS *****/

	/**
	 * Crée les deux canvas.
	 *
	 * Canvas de sélection de la couleur par une palette.
	 * Canvas de sélection de la teinte.
	 */

	createCanvases()
	{
		this.canvas_cp = document.querySelector(".palette-canvas");
		this.ctx_cp = this.canvas_cp.getContext("2d");
		this.ctx_cp.canvas.width = this.canvas_cp_width;
		this.ctx_cp.canvas.height = this.canvas_cp_height;

		this.canvas_tp = document.querySelector(".hue-canvas");
		this.ctx_tp = this.canvas_tp.getContext("2d");
		this.ctx_tp.canvas.width = this.canvas_tp_width;
		this.ctx_tp.canvas.height = this.canvas_tp_height;
	}


	/**
	 * Dessine la barre de sélection de la teinte.
	 *
	 * La teinte est une manière de visualisation des principales couleurs du spectre visible.
	 * La première couleur est "red" [255, 0, 0] ainsi que la dernière.
	 * 
	 * Le paramètre est "build" ou "find".
	 * "build" coloris le sélecteur de teinte
	 * "find"  coloris le sélecteur de teinte et quand il rencontre une couleur choisie, il set
	 * 		   la position actuelle de la couleur pour le curseur.
	 *
	 * @param: string - type - "build" || "find"
	 */

	drawHue(type)
	{
		/* Nombre de bits de couleurs à changer à chaque pixels.
		-5 pixels car l'ajustement de l'itération rajoute un pixel en trop
		à chaque itération (ex : si pixel = 259 on arrondi à 255). */

		var bits = (6 * 255) / (this.canvas_tp_width - 5);

		// On redéfinit les variables globales car "this" n'est pas accepté par les fonctions dans les méthodes.
		var ctx = this.ctx_tp,
			canvas_tp_height = this.canvas_tp_height,
			selected_primary = this.selected_primary,
			hue_cursor_x = this.hue_cursor_x;

		var position = 0,
			color = [255, 0, 0];

		while (color[1] < 255) {drawCell(1, 255);}
		while (color[0] > 0)   {drawCell(0, 0);}
		while (color[2] < 255) {drawCell(2, 255);}
		while (color[1] > 0)   {drawCell(1, 0);}
		while (color[0] < 255) {drawCell(0, 255);}
		while (color[2] > 0)   {drawCell(2, 0);}

		function drawCell(number, stop_at) {
			// log(position + "   " + Math.round(color[0]) + "," + Math.round(color[1]) + "," + Math.round(color[2]));

			/* Si cette option est choisie, cela signifie qu'on a rentré une couleur dans l'input.
			La teinte est alors coloriée normalement. Mais à chaque pixel, on vérifie si la couleur
			correspond à la teinte de la couleur rentrée dans l'input. Si oui, on stocke la position du
			pixel qui à la couleur correspondante. */

			if (type == "find") {

				var current_colors = [Math.round(color[0]), Math.round(color[1]), Math.round(color[2])];
				var precision = 4;
				var verif = true;

				/* Ici, nous testons si la couleur correspond avec une marge d'erreur (variable "précision").
				ex: si notre couleur voulue est 155, la marge d'erreur est de 2 donc il peut matcher
				la couleur testée si il est entre 153 et 157 inclus. */

				for (var a = 0; a < 3; a++) {
					var match = true;
					selected_primary[a] + precision >= current_colors[a] && selected_primary[a] - precision <= current_colors[a] ? match : match = false;
					match == false ? verif = false : verif;
				}

				/* Si la vérification renvoie juste ("false" n'a pas été renvoyé une seule fois
				sur le test d'une couleur), on ajoute la position aux variables globales. */
				verif ? hue_cursor_x = position : "";
			}

			// Ajoute le rectangle dans le canvas.
			ctx.fillStyle = "rgb(" + Math.round(color[0]) + "," + Math.round(color[1]) + "," + Math.round(color[2]) + ")";
			ctx.fillRect(position, 0, 1, canvas_tp_height);

			// Incrémente ou décrémente le bit pour changer la couleur graduellement.
			if (stop_at == 255) color[number] += bits;
			else color[number] -= bits;
			
			// Remet à 255 ou 0 le bit qui a été incrémenté en trop.
			if (color[number] > 255 && stop_at == 255) color[number] = 255;
			if (color[number] < 0 && stop_at == 0) color[number] = 0;
			
			position++;
		}

		this.hue_cursor_x = hue_cursor_x;

		// On ajoute le dernier pixel, à la valeur de (255, 0, 0) pour finir le spectre des teintes.
		ctx.fillStyle = "rgb(255, 0, 0)";
		ctx.fillRect(position, 0, 10, canvas_tp_height);
	}


	/**
	 * Dessine la palette de sélection de couleurs.
	 *
	 * La palette de couleurs est construite à partir de la teinte précédemment sélectionnée.
	 * En haut à gauche il y a la couleur blanche (255, 255, 255) puis en haut à droite la couleur de la teinte.
	 *
	 * À chaque ligne en partant du haut, on décrémente proportionnellement les bits de ces deux couleurs.
	 * Cette décrémentation permet à chaque bits de s'approcher de 0, qui est la couleur noire (0, 0, 0).
	 *
	 * Le deuxième paramètre est "build" ou "find".
	 * "build" coloris la palette
	 * "find"  coloris la palette et quand il rencontre une couleur choisie, il set la position actuelle de la
	 *         couleur pour le curseur.
	 *
	 * @param: int array - value - [R, G, B]
	 * @param: string 	 - type  - "build" || "find"
	 */

	drawPalette(rgb_primary, type)
	{
		var cells = this.canvas_cp_width / this.square_size, // Nombre de divisions largeur
			rows = this.canvas_cp_height / this.square_size; // Nombre de divisions hauteur

		/* Les deux prochaines variables jouent un grand rôle dans la précision des calculs.
		   Elles permettent que le calcul de proportionalité soit juste.

		* Mettons que que le colorpicker doit diviser des lignes en 3 cellules. (Première ligne, il y aura trois
		cellules de gauche à droite).
		Si il y a trois cellules, il vient de sois même de se dire qu'il faut diviser la valeur du pixel bleu par 3
		à chaque itération. Si on avait divisé par 3 comme le nombre de cellules, on aurait obtenu : 255, 170 et 85.

		* En revanche, sur la première ligne du colorpicker il faut avoir à gauche la valeur maximale (255)
		puis à droite la valeur minimale (0) pour le pixel blue de la couleur rouge (255, 0, 0).
		La première ligne doit avoir comme valeur bleue : 255 puis 127.5 puis 0. Au lieu de diviser par 3,
		on divise donc par 2, deux fois.

		* Ces variables comptent le nombre de lignes et colonnes nécessaires en fonction de la résolution choisie.
		Si on obtient 12 lignes, il faudra donc diviser par 11 pour les calculs de couleur. Voilà l'utilité de
		ces deux variables. On décrémente d'un la valeur des colonnes et lignes, pour obtenir une division juste. */

		var cells_divide = cells - 1,
			rows_divide = rows - 1;

		// Couleur initiale (couleur à droite en début de ligne).
		var start_red = 255,
			start_green = 255,
			start_blue = 255;

		// Couleur finale (couleur à gauche en fin de ligne).
		var end_red = rgb_primary[0],
			end_green = rgb_primary[1],
			end_blue = rgb_primary[2];

		// Pour chaques lignes.
		for (var i = 0; i < rows; i++) {

			// Assignation de la couleur de start de chaque ligne.
			var red = start_red,
				green = start_green,
				blue = start_blue;

			// log(Math.round(start_red) + "," + Math.round(green) + "," + Math.round(blue));

			var pos_y = i * this.square_size;

			// Pour chaques "cases" de lignes.
			for (var x = 0; x < cells; x++) {

				var pos_x = x * this.square_size;

				/* Si cette option est choisie, cela signifie qu'on a rentré une couleur dans l'input.
				La palette est alors coloriée en fonction de la teinte. À chaque pixel, on vérifie si
				la couleur correspond à celle rentrée dans l'input. Si oui, on stocke la position du
				pixel qui à la couleur correspondante. */
				if (type == "find") {

					var current_colors = [Math.round(red), Math.round(green), Math.round(Math.abs(blue))],
						precision = Math.round(255 / cells),
						verif = true;

					/* Ici, nous testons si la couleur correspond avec une marge d'erreur (variable "précision").

					PRECISION = 255 / nombre de divisions. Ici, pour que la couleur match, on adapte la précision
					en fonction du nombre de divisions. Le nb de divisions se calcule par la taille du canvas sur
					la taille des divisions (400px / 10px = 40 divisions).

					ex: si notre couleur voulue est 155, la marge d'erreur est de 2 donc il peut matcher
					la couleur testée si il est entre 153 et 157 inclus. */

					// On boucle trois fois pour les trois octets de la couleur.
					for (var a = 0; a < 3; a++) {

						var match = true;

						this.selected_rgb[a] + precision >= current_colors[a] && this.selected_rgb[a] - precision <= current_colors[a] ? match : match = false;

						match == false ? verif = false : verif;
					}

					/* Si la vérification renvoie juste ("false" n'a pas été renvoyé une seule fois
					sur le test d'une couleur), on ajoute la position aux variables globales. */
					verif ? (this.palette_cursor_x = pos_x, this.palette_cursor_y = pos_y) : "";
					// verif ? log(pos_x + " " + pos_y) : "";
				}

				// log(Math.round(red) + ", " + Math.round(green) + ", " + Math.round(blue));

				this.ctx_cp.fillStyle = "rgb(" + Math.round(red) + "," + Math.round(green) + "," + Math.round(blue) + ")";
				this.ctx_cp.fillRect(pos_x, pos_y, this.square_size, this.square_size);

				red   -= (start_red - end_red) / cells_divide;
				green -= (start_green - end_green) / cells_divide;
				blue  -= (start_blue - end_blue) / cells_divide;
			}

			// log("\n")

			// On sourtrait la couleur initiale.
			start_red   -= 255 / rows_divide;
			start_green -= 255 / rows_divide;
			start_blue  -= 255 / rows_divide;

			// On soustrait la couleur finale.
			end_red   -= rgb_primary[0] / rows_divide;
			end_green -= rgb_primary[1] / rows_divide;
			end_blue  -= rgb_primary[2] / rows_divide;
		}
	}




	/***** LISTENER FUNCTION *****/

	/**
	 * Méthode d'écoute de la souris. Écoute :
	 *
	 * - un déplacement sur la palette ;
	 * - le clic sur la palette ;
	 * - un déplacement sur le sélecteur de teinte ;
	 * - le clic sur le sélecteur de teinte.
	 * - un relachement d'un touche sur le bloc de sortie des chiffres (rgb, hex, hsl).
	 */

	listener()
	{
		// Listener du curseur palette pour le drag and drop.
		this.dragDropPalette(this.canvas_cp, this.palette_cursor, this.palette_cursor_x, this.palette_cursor_y);

		// Listener sur le canvas de sélection des couleurs.
		this.canvas_cp.addEventListener("mousedown", (e) => {

			if (e.target.className != "palette-pointer") {

				// Récupère les coordonnées du clic sur l'élément et de la couleur.
				var data = this.getCanvasData(e, this.canvas_cp);

				// Stocke les coordonées du curseur ainsi que la couleur dans des variables globales.
				this.setColors(data.rgb); // Met couleur obtenue dans variable globale.
				this.setCoordinates(data.coord, "palette"); // Met les coordonnées dans variable globale.

				// Déplace le curseur aux nouvelles coordonées.
				this.moveCursor("palette");

				// Affichage.
				this.outputCursorBackground(data.rgb, "palette");
				this.outputValues("all");
			}
		});
		
		// Listener du curseur teinte pour le drag and drop.
		this.dragDropHue(this.canvas_tp, this.hue_cursor, this.hue_cursor_x);

		// Listener sur le canvas de sélection de la teinte.
		this.canvas_tp.addEventListener("click", (e) => {

			if (e.target.className != "hue-pointer") {

				// Récupère les coordonnées du clic sur l'élément et de la couleur.
				var data = this.getCanvasData(e, this.canvas_tp);

				// Stocke les coordonées du curseur ainsi que la couleur dans des variables globales.
				this.setCoordinates(data.coord[0], "hue"); // Met la coordonée X variable globale.
				this.drawPalette(data.rgb, "build");

				// Déplace le curseur aux nouvelles coordonées.
				this.moveCursor("hue");

				// Update la couleur du curseur de la teinte.
				this.outputCursorBackground(data.rgb, "hue");

				// Récupération de la position du curseur de la palette.
				var c = this.canvas_cp.getContext('2d');
				var p = c.getImageData(this.palette_cursor_x, this.palette_cursor_y, 1, 1).data;

				// Changement de la couleur en fonction de la postion du curseur de la palette, non de la teinte.
				this.setColors([p[0], p[1], p[2]]);

				// Update la couleur du curseur de la palette avec la couleur anciennement stoquée.
				this.outputCursorBackground([p[0], p[1], p[2]], "palette");

				// Affichage.
				this.outputValues("all");
			}
		});

		// Listener de l'output color (couleur RGB / HEX) copy on click.
		document.querySelector(".output-color").addEventListener("click", (e) => {

			if (e.target.closest(".output-color-hover-rgb")) {
				this.copyToClipboard(this.selected_rgb);
				this.cmd.appendLine(this.selected_rgb + " copied.", "text", true);
				this.cmd.appendLine("", "input", false);
				this.cmd.finishInitializingCmd();
			}
			else if (e.target.closest(".output-color-hover-hex")) {
				this.copyToClipboard(this.selected_hex);
				this.cmd.appendLine(this.selected_hex + " copied.", "text", true);
				this.cmd.appendLine("", "input", false);
				this.cmd.finishInitializingCmd();
			}
		});

		// Listener des deux inputs.
		document.querySelector(".output-data").addEventListener("keyup", (e) => {

			// Exécute la fonction inputManager() en fonction du type "rgb" ou "hex" et de la valeur.
			if (e.target.classList.contains("output-rgb")) {
				this.inputManager(e.target.value, "rgb");
			}
			else if (e.target.classList.contains("output-hex")) {
				this.inputManager(e.target.value, "hex");
			}
		});
	}




	/***** MAIN FUNCTIONS *****/

	/**
	 * Méthode d'application d'une couleur rentrée dans un input (changement de la teinte et de la palette).
	 * Elle est exécutée lors d'un ajout de valeurs dans un input (rgb ou hex).
	 *
	 * @param: string (1-15) - value - "R, G, B" || "#xxxxxx"
	 * @param: string  	 (3) - type  - "rgb" || "hex"
	 */

	inputManager(value, type)
	{
		var result = 0;

		if (type == "rgb") {

			// Vérifie la valeur donnée.
			result = this.validateInput(value, "rgb");
		}
		else if (type == "hex") {

			// Value en minuscule pour que l'on puisse écrire CMD || cmd || Cmd...
			value = value.toLowerCase();

			// Si cmd on exécute l'invite de commande. Sinon, on vérifie la valeur donnée.
			if (value == "cmd") {
				this.cmd.start()
				this.output_hex.value = this.selected_hex;
			}

			else {
				result = this.validateInput(value.slice(1), "hex");
			}
		}

		// Si la valeur de l'input est valide.
		if (result) {

			// Ajoute la couleur de l'input dans les variables globales.
			// Dans setColors() la teinte est ajoutée dans une variable globale pour que drawHue() puisse savoir quelle couleur analyser.
			this.setColors(result);

			// Dessine le sélecteur de teinte et quand il recontre la teinte de la couleur l'input, on met sa position dans les variables globales.
			this.drawHue("find");

			// Dessine la palette avec la teinte de la couleur, puis quand el recontrera la couleur de l'input on met sa position dans les variables globales.
			this.drawPalette(this.selected_primary, "find");

			// Déplace les curseurs aux nouvelles coordonées.
			this.moveCursor("palette");
			this.moveCursor("hue");

			// Affichage.
			this.outputCursorBackground(this.selected_rgb, "palette");
			this.outputCursorBackground(this.selected_primary, "hue");
			this.outputValues("all");
		}
	}


	/**
	 * Méthode qui valide ce que l'utilisateur à rentré dans l'input des couleurs RGB ou HEX.
	 *
	 * @param: string (1-15) - value - "R, G, B" || "R G B" || "#xxxxxx", etc...
	 * @param: string 	 (3) - type  - "rgb" || "hex"
	 */

	validateInput(value, type)
	{
		// Cet array va contenir les trois valeurs : [R, G, B]
		var rgb = [],
			split,
			error;

		// Enlever "slice()" dans la fonction inputManager
		if (type == "hex") {

			value.length == 6 ? value : error = 1;

			rgb = this.hexToRgb(value);

			// Mettre en majuscules ?

			// var letters = ["A", "B", "C", "D", "E", "F", "G"];
			// var match = true;

			// // Il match les lettres.
			// for (var i = 0; i < letters.length; i++) {

			// 	match = hex.includes(letters[i]);
			// 	match ? match : match = false;
			// }

			// // Si il match les numéros.
			// for (var i = 0; i < hex.length; i++) {

			// 	hex[i] >= 0 && hex[i] <= 9 ? match : match = false;
			// }
			
			// match != false ? log(true) : log(false);
		}

		else if (type == "rgb") {

			// On "split()" de deux manières (espaces et virgules) pour plus de flexibilité dans l'ajout de valeurs.
			value.split(",").length == 3 ? split = value.split(",") :
			value.split(" ").length == 3 ? split = value.split(" ") : 0;

			// Suppression des espaces et virgules indésirables.
			split.forEach(function(el) {
				el[0] == " " ? el = el.slice(1) : el;
				el[el.length - 1] == "," ? rgb.push(parseInt(el.slice(0, -1))) : rgb.push(parseInt(el));
			});
		}

		// Vérification si chaque octet a bien une valeur comprise entre 0 et 255 inclus.
		rgb.forEach(function(el) {
			el >= 0 && el <= 255 && el != null ? "" : error = 1;
		});

		// Si il y a une erreur (bit + grand que 255, + petit que 0, etc) ou non.
		if (error) return 0;
		else return rgb;
	}


	/**
	 * Méthode de mise en place les écoutes du DOM pour permettre le "drag n' drop" sur la palette de couleurs.
	 * Lancée au chargement, elle positionne le curseur puis le permet d'être déplacé.
	 *
	 * @param: DOM object - parent  - l'élément DOM qui contient l'objet à déplacer.
	 * @param: DOM object - element - l'élément DOM qui est l'objet à déplacer.
	 * @param: int  (0-x) - x       - position X où le curseur doit être placé.
	 * @param: int  (0-x) - y       - position Y où le curseur doit être placé.
	 */

	dragDropPalette(parent, element, x, y)
	{
		// Si la souris est pressée ou non.
		var isMouseDown = false;

		// Dimensions du cancas, pour le déplacement maximal du curseur.
		var parentWidth = parent.clientWidth;
		var parentHeight = parent.clientHeight;

		// Position initiale de la souris lors du clic.
		var mouseX;
		var mouseY;

		// Position de l'élement sur le parent.
		var elementX = x;
		var elementY = y;

		// Offset est le décalage X et Y que l'élement aura hors du cadre pour se centrer. (ex : cercle de 30px, offset de 15px).
		var offsetX = parseInt("-" + element.clientWidth / 2);
		var offsetY = parseInt("-" + element.clientHeight / 2);

		// On positione l'élément sur le canvas.
		element.style.left = elementX + offsetX - 1 + 'px'; // Le - 1 empêche le curseur de sortir du la bordure du cadre du parent.
		element.style.top = elementY + offsetY + 'px';

		// Calcule la position intiale de la souris lors du clic.
		element.addEventListener("mousedown", (e) => {

			// Stop la transition du curseur pour que le drag n drop soit faisable.
			this.transitionManager(false, "palette");
			
			elementX = this.palette_cursor_x;
			elementY = this.palette_cursor_y;
			mouseX = e.clientX;
			mouseY = e.clientY;
			isMouseDown = true;
		});

		// Définit la position finale de l'élement à la fin du clic.
		document.addEventListener("mouseup", (e) => {

			// Autorise la transition du curseur.
			this.transitionManager(true, "palette");

			elementX = parseInt(element.style.left) - offsetX - 1; // Le - 1 empêche le curseur de sortir du la bordure du cadre du parent.
			elementY = parseInt(element.style.top) - offsetY - 1;
			isMouseDown = false;
		});

		// Écoute du déplacement de la souris sur tout le document.
		document.addEventListener("mousemove", (e) => {
			if (!isMouseDown) return;
			
			// Calcule la différence entre la position initiale de la souris et la position actuelle qui change.
			var deltaX = e.clientX - mouseX;
			var deltaY = e.clientY - mouseY;

			// Total déplacement.
			var moveX = elementX + deltaX + offsetX;
			var moveY = elementY + deltaY + offsetY;

			// Si la souris déplace la taille maximale de l'élément, on stop le déplacement en mettant la limite à la taille de l'élément.
			if (moveX >= parentWidth + offsetX) moveX = parentWidth + offsetX - 1;
			if (moveX <= 0 + offsetX) moveX = 0 + offsetX;
			if (moveY >= parentHeight + offsetY) moveY = parentHeight + offsetY - 1; // Le - 1 empêche le curseur de sortir du la bordure du cadre du parent.
			if (moveY <= 0 + offsetY) moveY = 0 + offsetY;

			// Déplace le curseur.
			element.style.left = moveX + 'px';
			element.style.top = moveY + 'px';


			// La suite n'est plus le drag and drop. C'est le calcul des coordonées pour trouver la couleur et l'affichage.
			var c = this.canvas_cp.getContext('2d');
			var p = c.getImageData(moveX - offsetX, moveY - offsetY, 1, 1).data;

			// Stocke les coordonées du curseur ainsi que la couleur dans des variables globales.
			this.setCoordinates([moveX - offsetX, moveY - offsetY], "palette");
			this.setColors([p[0], p[1], p[2]]);

			// Affichage.
			this.outputCursorBackground(this.selected_rgb, "palette");
			this.outputValues("all");
		});
	}


	/**
	 * Méthode de mise en place les écoutes du DOM pour permettre le "drag n' drop" sur le sélécteur de teinte.
	 * Lancée au chargement, elle positionne le curseur puis le permet d'être déplacé.
	 *
	 * @param: DOM object - parent  - l'élément DOM qui contient l'objet à déplacer.
	 * @param: DOM object - element - l'élément DOM qui est l'objet à déplacer.
	 * @param: int  (0-x) - x       - position X où le curseur doit être placé.
	 */

	dragDropHue(parent, element, x)
	{
		// Si la souris est pressée ou non.
		var isMouseDown = false;

		// Dimensions du cancas, pour le déplacement maximal du curseur.
		var parentWidth = parent.clientWidth;

		// Position initiale de la souris lors du clic.
		var mouseX;

		// Position de l'élement sur le parent.
		var elementX = x;

		// Offset est le décalage X et Y que l'élement aura hors du cadre pour se centrer. (ex : cercle de 30px, offset de 15px).
		var offsetX = parseInt("-" + element.clientWidth / 2);

		// On positione l'élément sur le canvas.
		element.style.left = elementX + offsetX - 1 + 'px'; // Le - 1 empêche le curseur de sortir du la bordure du cadre du parent.

		// Calcule la position intiale de la souris lors du clic.
		element.addEventListener("mousedown", (e) => {

			// Stop la transition du curseur pour que le drag n drop soit faisable.
			this.transitionManager(false, "hue");

			elementX = this.hue_cursor_x;
			mouseX = e.clientX;
			isMouseDown = true;
		});

		// Définit la position finale de l'élement à la fin du clic.
		document.addEventListener("mouseup", (e) => {

			// Autorise la transition du curseur.
			this.transitionManager(true, "hue");

			elementX = parseInt(element.style.left) - offsetX - 1; // Le - 1 empêche le curseur de sortir du la bordure du cadre du parent.
			isMouseDown = false;
		});

		// Écoute du déplacement de la souris sur tout le document.
		document.addEventListener("mousemove", (e) => {
			if (!isMouseDown) return;

			// Calcule la différence entre la position initiale de la souris et la position actuelle qui change.
			var deltaX = e.clientX - mouseX;

			// Total déplacement.
			var moveX = elementX + deltaX + offsetX;

			// Si la souris déplace la taille maximale de l'élément, on stop le déplacement en mettant la limite à la taille de l'élément.
			if (moveX >= parentWidth + offsetX) moveX = parentWidth + offsetX - 1;
			if (moveX <= offsetX) moveX = 0 + offsetX;

			// Déplace le curseur.
			element.style.left = moveX + 'px';


			// La suite n'est plus le drag and drop. C'est le calcul des coordonées pour trouver la couleur et l'affichage.
			var c1 = this.canvas_tp.getContext('2d');
			var p1 = c1.getImageData(moveX - offsetX, 0, 1, 1).data;

			// Ajout de la position du curseur de la teinte et re-dessine la palette.
			this.setCoordinates(moveX, "hue"); // Met la coordonée X variable globale.
			this.drawPalette([p1[0], p1[1], p1[2]], "build");

			// Update la couleur du curseur de la teinte.
			this.outputCursorBackground([p1[0], p1[1], p1[2]], "hue");


			// Récupération de la position du curseur de la palette.
			var c = this.canvas_cp.getContext('2d');
			var p = c.getImageData(this.palette_cursor_x, this.palette_cursor_y, 1, 1).data;

			// Stocke la couleur dans une variable globale.
			this.setColors([p[0], p[1], p[2]]);

			// Update la couleur du curseur de la palette avec la couleur anciennement stoquée.
			this.outputCursorBackground([p[0], p[1], p[2]], "palette");

			// Affichage.
			this.outputValues("all");
		});
	}


	/**
	 * Méthode qui déplace un curseur en fonction de la position donnée par les variables globales.
	 * 
	 * @param: string (3-7) - type - "palette" || "hue"
	 */

	moveCursor(type)
	{
		if (type == "palette") {
			this.palette_cursor.style.top = this.palette_cursor_y - this.palette_cursor_offset + "px";
			this.palette_cursor.style.left = this.palette_cursor_x - this.palette_cursor_offset + "px";
		}
		else if (type == "hue") {
			this.hue_cursor.style.left = this.hue_cursor_x - this.hue_cursor_offset + "px";
		}
	}


	/**
	 * Méthode active ou désactive la transition sur le déplacement des curseurs.
	 * Si on clique sur le canvas, il y a la transition, si on déplace
	 * manuellement le curseur, il n'y a pas de transition.
	 *
	 * @param: bool 		- bool
	 * @param: string (3-7) - type - "palette" || "hue"
	 */

	transitionManager(bool, type)
	{
		var cp,
			pointer;

		cp = document.querySelector(".color-picker")

		if (type == "palette") {
			pointer = document.querySelector(".palette-pointer");
		}
		else if (type == "hue") {
			pointer = document.querySelector(".hue-pointer");
		}
		
		if (bool) {
			pointer.style.setProperty("transition", "top 0.3s, left 0.3s");
			cp.style.setProperty("user-select", "auto"); // Interdit aussi le user-select.
			cp.style.setProperty("-moz-user-select", "auto");
		}
		else {
			pointer.style.setProperty("transition", "top 0s, left 0s");
			cp.style.setProperty("user-select", "none");
			cp.style.setProperty("-moz-user-select", "none");
		}
	}


	/**
	 * Méthode de copie dans le presse-papier.
	 *
	 * @param: string (1-x) - value
	 */

	copyToClipboard(value)
	{
		// Crée une zone de texte.
		var tArea = document.createElement("textarea");

		// Ajoute le contenu dans la zone de texte.
		tArea.value = value;

		// Ajoute la zone de texte dans le code HTML.
		document.body.appendChild(tArea);

		// Sélectionne le texte dans l'élément.
		tArea.select();

		// Copie le texte dans la zone de texte.
		document.execCommand("copy");

		// Supprime la zone de texte du code HTML.
		document.body.removeChild(tArea);
	}


	/**
	 * Méthode qui rend visible ou invisible CMD.
	 */

	cmdManager()
	{
		var egg = document.querySelector(".egg-wrapper");

		if (egg.style.display == "flex") {
			egg.style.display = "none";
		}
		else {
			egg.style.display = "flex";
		}
	}


	/**
	 * Méthode qui vérifie l'URL pour voir si une couleur a été donnée en paramètre.
	 * Si oui, on l'ajoute au color-picker.
	 */

	checkURL()
	{
		// ex: http://www.alexisphilip.fr/color-picker/index.html?color=FF00FF
		var url = new URL(window.location.href);
		var param = url.searchParams.get("color");
				log(param)

		// Si il y a un paramètre.
		if (param != null) {

			// Si c'est une chaîne hexadécimale (ex: "FF00FF").
			if (param.split(",").length == 1 && param.split(" ").length == 1) {
				this.inputManager("#" + param, "hex");
			}

			// Si c'est une chaîne RGB (ex: "10, 15, 10" ou "10 15 10").
			else if (param.split(",").length > 1 || param.split(" ").length > 1) {
				this.inputManager(param, "rgb");
			}
		}
	}




	/***** SETTERS & GETTERS FUNCTIONS *****/

	/**
	 * Méthode extrait des informations du clic sur un canvas.
	 * Renvoie un objet contenant la couleur du pixel cliqué ainsi que sa position.
	 * 
	 * @param:  event object - e	  - objet d'écoute. Contient la position du clic sur le canvas.
	 * @param:  DOM object   - canvas - objet DOM du canvas.
	 * @return: object 	 (2) -   	  - objet contenant la couleur du pixel cliqué ainsi que sa position.
	 */

	getCanvasData(e, canvas)
	{
		var x = e.layerX;
		var y = e.layerY;
		var c = canvas.getContext('2d');
		var p = c.getImageData(x, y, 1, 1).data;

		return {
			rgb: [p[0], p[1], p[2]],
			coord: [x, y]
		};
	}


	/**
	 * Méthode qui set en variable globale les couleurs.
	 * 
	 * selected_primary : contient la couleur primaire de la couleur donnée.
	 * selected_hex : contient la couleur donnée en hexadécimal.
	 * selected_rgb : contient la couleur donnée en RGB.
	 * selected_hsl : contient la couleur donnée en HSL.
	 * 
	 * @param: int array (3) - value - [R, G, B]
	 */

	setColors(rgb)
	{
		/* Cas particulier : si les trois octets sont les mêmes, il est impossible d'effectuer la formule pour trouver la teinte.
		Il faut alors définir manuellement la teinte, ici j'ai prit le rouge (car c'est la première couleur du spectre visible). */
		if (rgb[0] == rgb[1] && rgb[1] == rgb[2] && rgb[2] == rgb[0]) {
			this.selected_primary = [255, 0, 0];
		}
		else {
			this.selected_primary = this.colorToPrimary(rgb);
		}
		
		this.selected_hex = ("#" + this.rgbToHex(rgb)).toUpperCase();
		this.selected_rgb = [rgb[0], rgb[1], rgb[2]];
		this.selected_hsl = this.RGBtoHSL(rgb);
	}


	/**
	 * Méthode qui set en variable globale les coordonées d'un curseur.
	 * 
	 * @param: int array (2) || int (0-x) - coords - [150, 34] || 87
	 * @param: string 				(3-7) - type   - "palette" || "hue"
	 */

	setCoordinates(coords, type)
	{
		if (type == "palette") {
			this.palette_cursor_x = coords[0];
			this.palette_cursor_y = coords[1];
		}
		else if (type == "hue") {
			this.hue_cursor_x = coords;
		}
	}


	/**
	 * Méthode qui set un thème de couleurs.
	 *
	 * @param: string (5-8) - type   - "isExists" || "build"
	 * @param: string (1-x) - scheme
	 */

	setColorScheme(type, scheme)
	{
		// Liste des thèmes.
		var schemes = [
			{
				name: "default",
				color_main: "#FFFFFF",
				color_cmd: "#FFFFFF",
				color_label: "#DEDEDE",
				background_main: "#5C5C5C",
				background_cmd: "#1b1b1d",
				// border_cmd: "none",
				// border_data_box: "none",
				border_input: "1px solid #6A6A6A",
				box_shadow: "0px 0px 25px -11px rgba(255,255,255,0.6)",
				box_shadow_cmd: "none"
			}, {
				name: "dark",
				color_main: "#D5D5D5",
				color_cmd: "white",
				color_label: "#AAAAAA",
				background_main: "#2A2A2E",
				background_cmd: "#2A2A2E",
				// border_cmd: "none",
				// border_data_box: "none",
				border_input: "1px solid #404040",
				box_shadow: "0px 0px 25px -11px rgba(255,255,255,0.6)",
				box_shadow_cmd: "0px 0px 25px -11px rgba(255,255,255,0.6)"
			}, {
				name: "hacker",
				color_main: "#00FF00",
				color_cmd: "#00FF00",
				color_label: "#00B500",
				background_main: "#1B1B1D",
				background_cmd: "#000000",
				// border_cmd: "none",
				// border_data_box: "none",
				border_input: "none",
				box_shadow: "0px 0px 25px -11px rgba(255,255,255,0.4)",
				box_shadow_cmd: "0px 0px 25px -11px rgba(255,255,255,0.1)"
			}, {
				name: "light",
				color_main: "#404040",
				color_cmd: "#000000",
				color_label: "#757575",
				background_main: "#D5D5D5",
				background_cmd: "none",
				// border_cmd: "none",
				// border_data_box: "none",
				border_input: "none",
				box_shadow: "0px 0px 25px -11px rgba(64, 64, 64, 0.7)",
				box_shadow_cmd: "0px 0px 25px -11px rgba(64, 64, 64, 0.7)"
			}
		];

		var selected_scheme = {};
		var scheme_found;

		// Parcours tous les thèmes, et trouve celui choisi en fonction du nom.
		for (var i = 0; i < schemes.length; i++) {

			// Si le nom du thème match le nom passé en paramètre.
			if (schemes[i].name == scheme) {

				// Si le paramètre de la fonction est "isExists", on doit simplement faire une vérification du thème, si il existe ou non.
				if (type == "isExists") {
					// Si il existe, on renvoie le nom.
					return schemes[i].name;
				}
				// Si c'est un autre paramètre, on met en place le thème.
				else {
					// Fait une copie de l'array.
					scheme_found = true;
					selected_scheme = JSON.parse(JSON.stringify(schemes[i]));
				}
			}
		}

		// Si le thème n'est pas trouvé, on retourne "false".
		if (!scheme_found) return false;

		// Array des défintions (sélecteur, propriété, valeur).
		var definitions = [
			["input", "color", selected_scheme.color_main],						  // Color main
			[".cmd, .nerd-stats", "color", selected_scheme.color_cmd],			  // Color CMD
			["label", "color", selected_scheme.color_label],					  // Color label

			[".color-picker", "background", selected_scheme.background_main],     // Background main
			[".cmd, .nerd-stats", "background", selected_scheme.background_cmd],  // Background CMD et stats

			// [".palette-wrapper", "border", selected_scheme.border_cmd], 		  // Border palette
			// [".cmd", "border-top", selected_scheme.border_cmd],				  // Border CMD
			// [".cmd", "border-bottom", selected_scheme.border_cmd],
			// [".cmd", "border-left", selected_scheme.border_cmd],
			// [".nerd-stats", "border", selected_scheme.border_cmd],
			// [".output-data", "border", selected_scheme.border_data_box], 	  // Border data
			[".output-box input", "border-bottom", selected_scheme.border_input], // Border input
			
			[".output-data", "box-shadow", selected_scheme.box_shadow], 		  // Shadow data
			[".cmd, .nerd-stats", "box-shadow", selected_scheme.box_shadow_cmd],  // Shadwo CMD
		];

		// Pour chaque définitions, on l'applique.
		for (var i = 0; i < definitions.length; i++) {
			setCSS(definitions[i][0], definitions[i][1], definitions[i][2]);
		}
		
		// Applique la définition CSS.
		function setCSS(selector, property, value) {

			if (!selector) return;

			var node = document.querySelectorAll(selector);
			document.querySelectorAll(selector).forEach(function(el) {
				el.style.setProperty(property, value);
			});
		}

		// Si le thème choisis n'est pas le même que le thème dans le cookie, on supprime cet ancien cookie et on set le nouveau avec le nom du thème pendant 30 jours.
		if (scheme != this.getCookie("scheme")) {
			this.eraseCookie("scheme");
			this.setCookie("scheme", selected_scheme.name, 30);
		}

		// Si le thème est trouvé, on retourne son nom.
		return selected_scheme.name;
	}


	/**
	 * Méthode qui set la taille d'un pixel de la palette.
	 *
	 * @param: int (1-15) - size_pixel
	 */

	setSquareSize(size_pixel)
	{
		// Set la nouvelle taille du pixel de la palette.
		this.square_size = size_pixel;

		this.drawPalette(this.selected_primary, "build");
	}


	/**
	 * Méthode qui créée un cookie.
	 * 
	 * @param: string (1-x) - name
	 * @param: string (1-x) - value
	 * @param: int    (1-x) - days
	 */

	setCookie(name, value, days)
	{
		var expires = "";
		var date = new Date();

		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = date.toUTCString();

		document.cookie = name + "=" + value + "; expires=" + expires;
	}


	/**
	 * Méthode qui récupère les informations un cookie.
	 * 
	 * @param:  string (1-x) - name
	 * @return: string (1-x) - c
	 */

	getCookie(name)
	{
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');

		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}

		return null;
	}


	/**
	 * Méthode qui supprime un cookie.
	 * 
	 * @param: string (1-x) - name
	 */

	eraseCookie(name)
	{
		// Supprime le cookie en lui attribuant une valeur négative.
		document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
	}




	/***** TRANSLATE FUNCTIONS *****/

	/**
	 * Convertis une couleur rgb en la teinte (couleur primaire) de cette-ci.
	 *
	 * @param:  int array (3) - [168, 140, 56]
	 * @return: int array (3) - [255, 184, 0]
	 */


	colorToPrimary(rgb)
	{
		var result = [],
			order_rgb = rgb.slice();

		var pri_h = 255, // Déclaration des couleurs primaires.
			pri_m,
			pri_l = 0;

		var h,
			m,
			l;

		// Trie les nombres numériquement.
		order_rgb.sort(function(a, b){return a - b});

		h = order_rgb[2];
		m = order_rgb[1];
		l = order_rgb[0];

		// Formule magique pour calculer le bit moyen de la couleur primaire.
		pri_m = (255 * h * (m - l)) / (Math.pow(h, 2) - h * l);

		// On place les nouvelles valeurs en fonction de l'ordre de grandeur des bits.
		rgb[0] >= rgb[1] && rgb[1] >= rgb[2] ? result = [pri_h, pri_m, pri_l] :
		rgb[1] >  rgb[0] && rgb[0] >= rgb[2] ? result = [pri_m, pri_h, pri_l] :
		rgb[1] >= rgb[2] && rgb[2] >  rgb[0] ? result = [pri_l, pri_h, pri_m] :
		rgb[2] >  rgb[1] && rgb[1] >  rgb[0] ? result = [pri_l, pri_m, pri_h] :
		rgb[2] >  rgb[0] && rgb[0] >= rgb[1] ? result = [pri_m, pri_l, pri_h] :
		rgb[0] >= rgb[2] && rgb[2] >  rgb[1] ? result = [pri_h, pri_l, pri_m] : "";

		// On arondit les éléments du tableau.
		result.forEach(function(el, index, array) {
			array[index] = Math.round(el);
		})

		return result;
	}


	/**
	 * Convertis une couleur RGB en couleur HSL.
	 *
	 * Formules : https://en.wikipedia.org/wiki/HSL_and_HSV#From_RGB
	 * 
	 * @param:  int array - RGB      (3) - [168, 140, 56]
	 * @return: int array - H° L% S% (3) - [320, 80, 45]
	 */

	RGBtoHSL(rgb)
	{
		var order_RGB = rgb.slice(), // Contient les valeurs RGB ordonées numériquement.
			R, G, B,
			hue,
			saturation,
			luminance,
			Cmin,
			Cmax;

		// Trie les valeurs numériquement.
		order_RGB.sort(function(a, b){return a - b});

		R = rgb[0] / 255;
		G = rgb[1] / 255;
		B = rgb[2] / 255;

		Cmin = order_RGB[0] / 255;
		Cmax = order_RGB[2] / 255;

		// Calcul de la luminance.
		luminance = (Cmax + Cmin) / 2;

		// Calcul de la saturation.
		// Ici, si les octets sont les mêmes et/ ou sont égaux à 0 ou 1 (0 ou 255)
		if (R == G && G == B ||
		   (R == G && G == B && R == 0) ||
		   (R == G && G == B && R == 1)) saturation = 0;
		else if (luminance < 0.5)  saturation = (Cmax - Cmin) / (Cmax + Cmin);
		else if (luminance >= 0.5) saturation = (Cmax - Cmin) / (2 - Cmax - Cmin);

		// Calcul de l'angle.
		if (rgb[0] == rgb[1] && rgb[1] == rgb[2]) hue = 0;
		else if (rgb[0] == order_RGB[2])		  hue = 60 * (0 + (G - B) / (Cmax - Cmin));
		else if (rgb[1] == order_RGB[2])		  hue = 60 * (2 + (B - R) / (Cmax - Cmin));
		else if (rgb[2] == order_RGB[2])		  hue = 60 * (4 + (R - G) / (Cmax - Cmin));

		// Si l'angle est inférieur à 0, on ajoute 360 degrés pour avoir un intervale de [0, 359].
		if (hue < 0) hue = hue + 360;

		this.HSLtoRGB([Math.abs(Math.round(hue)), Math.round(saturation * 100), Math.round(luminance * 100)]);

		return [Math.abs(Math.round(hue)), Math.round(saturation * 100), Math.round(luminance * 100)];
	}


	/**
	 * Convertis une couleur HSL en couleur RGB.
	 *
	 * Formules : https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB
	 * 
	 * @param:  int array (3) - H° L% S% - [320, 80, 45]
	 * @return: int array (3) - RGB      - [168, 140, 56]
	 */

	HSLtoRGB(hsl)
	{
		var H, S, L,
			R, G, B,
			temp_1,
			temp_2,
			temp_R,
			temp_G,
			temp_B,
			hue_decimal;
			
		H = hsl[0];
		S = hsl[1] / 100;
		L = hsl[2] / 100;

		// log(H + " " + S + " " + L)

		/* Si il n'y a pas de saturation, c'est que la couleur est une nuance de
		gris. Tous les pixels ont alors la même valeur, et se calcule ainsi : */
 		if (H == 0 && S == 0) {
 			R = (L) * 255;
 			return [Math.round(R), Math.round(R), Math.round(R)];
 		}

 		// Calcul des variables temporaires.
		if (L < 0.5)	   temp_1 = L * (1 + S);
		else if (L >= 0.5) temp_1 = L + S - L * S;
		temp_2 = 2 * L - temp_1;

		// Teinte degrés vers teinte décimale (ex : 180° = 0.5).
		hue_decimal = H / 360;

		// Calcul des variables RGB temporaires.
		temp_R = hue_decimal + 0.333;
		temp_G = hue_decimal;
		temp_B = hue_decimal + 0.333;

		temp_R < 0 ? temp_R + 1 : temp_R > 0 ? temp_R - 1 : 0;
		temp_G < 0 ? temp_G + 1 : temp_G > 0 ? temp_G - 1 : 0;
		temp_B < 0 ? temp_B + 1 : temp_B > 0 ? temp_B - 1 : 0;

		(6 * temp_R) < 1 ? R = temp_2 + (temp_1 - temp_2) * 6 * temp_R :
		(2 * temp_R) < 1 ? R = temp_1 :
		(3 * temp_R) < 2 ? R = temp_2 + (temp_1 - temp_2) * 6 * (0.666 - temp_R) : 
		R = temp_2;

		(6 * temp_G) < 1 ? G = temp_2 + (temp_1 - temp_2) * 6 * temp_G :
		(2 * temp_G) < 1 ? G = temp_1 :
		(3 * temp_G) < 2 ? G = temp_2 + (temp_1 - temp_2) * 6 * (0.666 - temp_G) : 
		G = temp_2;

		(6 * temp_B) < 1 ? B = temp_2 + (temp_1 - temp_2) * 6 * temp_B :
		(2 * temp_B) < 1 ? B = temp_1 :
		(3 * temp_B) < 2 ? B = temp_2 + (temp_1 - temp_2) * 6 * (0.666 - temp_B) : 
		B = temp_2;

		R *= 255;
		G *= 255;
		B *= 255;

		log([Math.round(R), Math.round(G), Math.round(B)])
		return [Math.round(R), Math.round(G), Math.round(B)];
	}


	/**
	 * Convertis un angle de teinte en un tableau rgb.
	 *
	 * @param:  int array (3) - [168, 140, 56]
	 * @return: int   (0-359) - 45
	 */

	rgbToHueAngle(rgb)
	{
		var angle;

		rgb[0] >= rgb[1] && rgb[1] >= rgb[2] ? calc(rgb[0], rgb[1], rgb[2], 0) :
		rgb[1] >  rgb[0] && rgb[0] >= rgb[2] ? calc(rgb[1], rgb[0], rgb[2], -2) :
		rgb[1] >= rgb[2] && rgb[2] >  rgb[0] ? calc(rgb[1], rgb[2], rgb[0], 2) :
		rgb[2] >  rgb[1] && rgb[1] >  rgb[0] ? calc(rgb[2], rgb[1], rgb[0], -4) :
		rgb[2] >  rgb[0] && rgb[0] >= rgb[1] ? calc(rgb[2], rgb[0], rgb[1], 4) :
		rgb[0] >= rgb[2] && rgb[2] >  rgb[1] ? calc(rgb[0], rgb[2], rgb[1], -6) :
		log("Error: rgbToHueAngle()");

		function calc(h, m, l, num) {
			angle = Math.abs(Math.round(60 * ((m - l)/(h - l) + num)));
		}

		return angle;
	}


	/**
	 * Convertis un angle de teinte en un tableau rgb.
	 *
	 * L'angle doit être comprit entre 0 et 360 degrés inclus.
	 *
	 * @param:  int   (0-359) - 60
	 * @return: int array (3) - [255, 0, 255]
	 */

	hueAngleToRgb(angle)
	{
		var rgb = [];

		(angle <= 60)  ? rgb = [255, calc(60), 0] :
		(angle <= 120) ? rgb = [255 - calc(120), 255, 0] :
		(angle <= 180) ? rgb = [0, 255, calc(180)] :
		(angle <= 240) ? rgb = [0, 255 - calc(240), 255] :
		(angle <= 300) ? rgb = [calc(300), 0, 255] :
		(angle <= 360) ? rgb = [0, 0, 255 - calc(360)] :
		log("Error: hueAngleToRgb()\n=> Hue angle is wrong: " + angle);

		function calc(angle_max) {
			return Math.round((angle * 255) / angle_max);
		}

		return rgb;
	}


	/**
	 * Convertis un tableau rgb en une chaîne hexidécimale.
	 *
	 * @param:  int array (3) - [118, 78, 53]
	 * @return: string    (6) - 764E35
	 */

	rgbToHex(rgb)
	{
		var hex = "";

		// 3 fois pour les trois octets (Rs, V et B).
		for (var i = 0; i < 3; i++) {
			var hex_byte = rgb[i].toString(16);
			hex_byte.length == 1 ? hex += "0" + hex_byte : hex += hex_byte;
		}

		return hex.toUpperCase();
	}


	/**
	 * Convertis une chaîne hexidécimale en un tableau rgb.
	 *
	 * @param:  string    (6) - 764E35
	 * @return: int array (3) - [118, 78, 53]
	 */

	hexToRgb(hex)
	{
		var bigint = parseInt(hex, 16);
		var r = (bigint >> 16) & 255;
		var g = (bigint >> 8) & 255;
		var b = bigint & 255;

		return [r, g, b];
	}




	/***** OUTPUT FUNCTIONS *****/

	/**
	 * Affiche la couleur sélectionnée par le curseur sur lui-même.
	 *
	 * @param: int array (3) - rgb
	 * @param: string  (3-7) - type - "palette" || "hue"
	 */

	outputCursorBackground(rgb, type)
	{
		if (type == "palette") {
			this.palette_cursor.style.background = "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
		}
		else if (type == "hue") {
			this.hue_cursor.style.background = "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
		}
	}


	/**
	 * Affichage des valeurs RGB & HEX, de la pré-vision de la couleur et de la position du curseur palette dans le CMD.
	 *
	 * @param: string (3-7) - type - "palette" || "hue"
	 */

	outputValues(type)
	{
		if (type == "palette") {
			this.output_rgb.value = this.selected_rgb[0] + ", " + this.selected_rgb[1] + ", " + this.selected_rgb[2];
		}
		else if (type == "hue") {
			this.output_hex.value = this.selected_hex.toUpperCase();
		}
		else {
			this.output_rgb.value = this.selected_rgb[0] + ", " + this.selected_rgb[1] + ", " + this.selected_rgb[2];
			this.output_hex.value = this.selected_hex.toUpperCase();
			this.output_hsl.value = this.selected_hsl[0] + "° " + this.selected_hsl[1] + "% " + this.selected_hsl[2] + "%";
		}

		// Affichage de la couleur sur le rectangle de preview.
		this.output_palette_color.style.background = this.selected_hex;

		// Affichage de la position du curseur de la palette dans le CMD.
		this.output_cursor_palette_x.innerHTML = "CursorX: " + this.palette_cursor_x + " px";
		this.output_cursor_palette_y.innerHTML = "CursorY: " + this.palette_cursor_y + " px";
	}
}

// Initialisation de l'objet.
var colorPicker = new ColorPicker;
colorPicker.start();