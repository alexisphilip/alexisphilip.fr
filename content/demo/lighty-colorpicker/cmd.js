
/**
 * Cmd Class.
 *
 * Cette classe permet l'initialisation et le contrôle du CMD du color picker (invite de commandes).
 * 
 * Principales fonctions:
 * - thèmes
 * - définition de la palette
 * - execution du CMD au chargement de la page
 * - gestion des cookies
 */


class Cmd
{
	constructor()
	{
		// Sélecteurs du CMD et des lignes du CMD.
		this.cmd_wrapper = document.querySelector(".cmd");
		this.cmd = document.querySelectorAll(".cmd .cmd-value");

		// Compteur de lignes.
		this.line_number;

		// Interval pour le clignotement du curseur.
		this.interval;

		// Toutes les commandes stockées dans l'array.
		this.commands = [];

		// Position de la commande dans l'array.
		this.current_position = 0;
	}


	/**
	 * Lancement des fonctions pour initaliser correctement le CMD.
	 */

	start()
	{
		// Affiche ou non le CMD.
		colorPicker.cmdManager();

		// Remise à zéro du nombre de lignes à chaque lancement du CMD.
		this.line_number = 0;

		// Supprime tous les enfants pour qu'a chaque lancement de la fonction cmd(), elle soit remise à 0.
		while (this.cmd_wrapper.firstChild) {
			this.cmd_wrapper.removeChild(this.cmd_wrapper.firstChild);
		}

		// Ajout des premières lignes du CMD.
		this.appendLine("", "text", true);
		this.appendLine("", "text", true);
		this.appendLine("", "text", false);
		this.appendLine("", "input", false);

		// Animations du texte lors du chargement.
		this.startAnimation(0, "── ColorPicker terminal ──");
		this.startAnimation(2, "Type \"help\" or \"?\" for help.");
		this.startAnimation(3, "Just type a [command] to see all options.");

		// Set les nouvelles variables.
		this.cmdScrollBottom();
		this.selectInput();

		// Set les listeners par rapport aux nouvelles variables.
		this.intervalManager(true);
		this.inputFocusIn();
		this.inputFocusOut();
		this.keyPress();
	}


	/**
	 * Méthode d'initialisation du CMD après un ajout de ligne.
	 * Met à jour les variables et les addEventListener.
	 */

	finishInitializingCmd()
	{
		// Set les nouvelles variables.
		this.cmdScrollBottom();
		this.selectInput();
		this.focusInput();

		// Set les listeners par rapport aux nouvelles variables.
		this.intervalManager(false);
		this.inputFocusIn();
		this.inputFocusOut();
		this.keyPress();
	}


	/**
	 * Méthode qui utilise des fonctions asynchrones pour ajouter des caractères après un délai de temps.
	 * 
	 * @param: int    - line
	 * @param: string - text
	 */

	startAnimation(line, text)
	{
		var line = document.querySelector(".cmd .cmd-line[data-number=\"" + line + "\"]");
		
		var chars = text.split("");

		processArray(chars);

		async function processArray(chars) {
			for (const item of chars) {
				await delayed(item);
			}
		}

		async function delayed(item) {
			await delay();
			line.innerHTML += item;
		}

		function delay() {
			return new Promise(resolve => setTimeout(resolve, 60));
		}
	}


	/**
	 * Scroll tout en bas du cmd.
	 */

	cmdScrollBottom()
	{
		this.cmd_wrapper.scrollTop = this.cmd_wrapper.scrollHeight;
	}


	/**
	 * Sélectionne le dernier input.
	 */

	selectInput()
	{
		this.cmd = document.querySelectorAll(".cmd-value");
		this.cmd = this.cmd[this.cmd.length - 1];
	}


	/**
	 * Focus sur l'input.
	 */

	focusInput()
	{
		this.cmd.focus();
	}


	/**
	 * Listener de la sélection de l'input.
	 * Stop le clignotement du faux curseur de l'input.
	 */

	inputFocusIn()
	{
		this.cmd.addEventListener("focus", (e) => {
			this.intervalManager(false);
			this.cmd.value.slice(-1) == "_" ? this.cmd.value = this.cmd.value.slice(0, -1) : ""; // Supprime le dernier caractère si c'est un "_".
		});
	}


	/**
	 * Listener de la désélection de l'input.
	 * Lance le clignotement du faux curseur de l'input.
	 */

	inputFocusOut()
	{
		this.cmd.addEventListener("focusout", (e) => {
			this.intervalManager(true);
		});
	}


	/**
	 * Listener sur les touches du clavier.
	 * => Lance la fonction d'analyse de la commande.
	 * => Lance la fonction de parcours de commandes.
	 */

	keyPress()
	{
		var value;

		this.cmd.addEventListener("keyup", (e) => { // ESSAYER AVEC KEYUP

			// Si on appuie sur la touche entrée.
			if (e.keyCode == 13) {

				// Si la valeur de l'input n'est pas vide.
				if (e.target.value != "") {

					// Si la valeur de l'input n'est pas égal à la dernière commande rentrée.
					if (e.target.value !== this.commands[this.commands.length - 1]) {

						// On ajoute son contenu dans l'array et on update la position.
						this.commands.push(e.target.value);
						this.current_position = this.commands.length;
					}
				}

				this.cmdCommand();
			}


			/* Si l'array à trois positions ["test", "cookie", "exit"]
			La "current_position" sera à 4, car les entrées sont stockées aux autres positions. */

			// Si on appuie sur la flèche du haut.
			if (e.keyCode == 38) {

				if (this.current_position > 0) this.current_position--;

				if (this.current_position >= 0 && this.current_position < this.commands.length) {
					e.target.value = this.commands[this.current_position];
				}
			}

			// Si on appuie sur la flèche du bas.
			if (e.keyCode == 40) {

				if (this.current_position < this.commands.length) this.current_position++;

				if (this.current_position >= 0 && this.current_position < this.commands.length) {
					e.target.value = this.commands[this.current_position];
				}
				// Si la position est 4 (et que l'array n'a que 3 positions) on vide le contenu de l'input.
				else if (this.current_position == this.commands.length) {
					e.target.value = "";
				}
			}
		});
	}
	

	/**
	 * Interval pour le clignotement du curseur.
	 *
	 * @param: bool - bool
	 */

	intervalManager(bool)
	{
		var cursor = false;

		if (bool) {
			// Affichage une fois pour que le curseur apparaisse avant que la fonction setInterval ne fasse attendre 1s.
			// cursor == false ? (cmd.value = cmd.value + "_", cursor = true) : (cmd.value = cmd.value.slice(0, -1), cursor = false);
			this.interval = setInterval(function() {
				cursor == false ? (this.cmd.value = this.cmd.value + "_", cursor = true) : (this.cmd.value = this.cmd.value.slice(0, -1), cursor = false);
			}.bind(this), 700);
		}
		else {
			clearInterval(this.interval);
		}
	}


	/**
	 * Méthode qui interprête la commande que l'utilisateur a tapé.
	 *
	 * Interprête la commande.
	 * Renvoie une réponse.
	 * Rajoute une ligne pour que l'utilsateur entre d'autres commandes.
	 */

	cmdCommand()
	{
		var command = this.cmd.value.split(" ");
		var value = "";
		var values = [];

		/* IMPORTANT : deux types de conditions.

		Si les tests se font uniquement sur des commandes (ex: cookies list)
		if (command[0] == "cmd") {

			if (command[1] == "onload") {}		// Tests des commandes.
			else if (command[1] == "height") {}
			else {}								// Si aucune des commandes n'est juste.
		}

		Si les tests se font sur une entrée utilisateur (ex: cookie delete -nom)
		if (command[1] == "delete") {

			if (command[2]) {					  // On vérifie si un nom est entré.
				if (command[2] == "all") {}		  // Si il est entré, on exécute le reste.
				else if (command[2].length > 0) {
			}
			else {}								  // Sinon, pas de nom entré.
		}
		*/

		/**
		 * Command: cmd
		 */

		if (command[0] == "cmd") {

			// Set les cookies pour le chargement du CMD dès le chargement de la page.
			if (command[1] == "onload") {

				if (command[2] == "true") {
					colorPicker.setCookie("onload", "true", 30);

					value = "CMD will be loaded on page load.";
					this.appendLine(value, "text", true);
				}
				else if (command[2] == "false") {
					colorPicker.setCookie("onload", "false", 30);

					value = "CMD will not be loaded on page load.";
					this.appendLine(value, "text", true);
				}
				else {
					value = "cmd onload true||false";
					this.appendLine(value, "text", true);
				}
			}
			// else if (command[1] == "height") {
			// 	// value = "height";
			// 	// appendLine(value, "text", true);
			// }
			else {
				values = [
					["cmd onload true||false", "Open CMD on load"]/*,
					["cmd height -lines", "Set CMD height"]*/
				];

				this.appendLine(values, "text", true);
			}
		}

		/**
		 * Command: cookie
		 */

		else if (command[0] == "cookie") {

			// Liste tous les cookies.
			if (command[1] == "list") {

				// Si il y des cookies.
				if (document.cookie.length > 0) {
					var cookies = document.cookie.split(";");

					// Ajoute tous les cookies dans la liste.
					cookies.forEach(function(cookie) {
						values.push(cookie);
					});

					// On affiche tous les cookies.
					this.appendLine(values, "text", true);
				}
				else {
					value = "There is no cookies.";
					this.appendLine(value, "text", true);
				}
			}

			// Supprime les cookies lié au thème.
			else if (command[1] == "delete") {

				// Si il y a un troisième paramètre.
				if (command[2]) {

					// Supprime tous les cookies.
					if (command[2] == "all") {
						var cookies = document.cookie.split(";");

						cookies.forEach(function(cookie) {
							var name = cookie.split("=")[0];

							if (name[0] == " ") name = name.slice(1);

							colorPicker.eraseCookie(name);
						});

						value = "All cookies successfully deleted.";
						this.appendLine(value, "text", true);
					}

					// Supprime les cookies par le nom.
					else if (command[2].length > 0) {
						var cookieExists = colorPicker.getCookie(command[2]);

						// Si le nom du cookie est juste.
						if (cookieExists) {
							colorPicker.eraseCookie(command[2]);

							value = "Cookie \"" + command[2] + "\" successfully deleted.";
							this.appendLine(value, "text", true);
						}
						else {
							value = "Cookie \"" + command[2] + "\" does not exit.";
							this.appendLine(value, "text", true);
						}
					}
				}

				// Si il y a pas de troisième paramètre.
				else {
					values = [
						["cookie delete all", "Delete all cookies"],
						["cookie delete -name", "Delete cookie by name"]
					];

					this.appendLine(values, "text", true);
				}
			}

			else if (command[1] == "recette") {
				window.open("https://www.marmiton.org/recettes/recette_cookies-maison_86989.aspx");
			}

			// Si il y a pas de deuxième paramètre.
			else {
				values = [
						["cookie delete all", "Delete all cookies"],
						["cookie delete -name", "Delete cookie by name"],
						["cookie list", "List all cookies"],
						["cookie recette", "Très moelleux"]
				];

				this.appendLine(values, "text", true);
			}
		}

		/**
		 * Command: rgb
		 */

		else if (command[0] == "rgb") {

			// Si il y a une deuxième commande.
			if (command[1]) {

				var color = command[1].split(",");

				// Si la valeur RGB split vaut 3 (il y a bien les trois valeurs RGB).
				if (color.length == 3) {
					colorPicker.inputManager(command[1], "rgb");

					value = command[1] + " is up and running.";
					this.appendLine(value, "text", true);
				}
				else {
					value = "Invalid RGB value -r,g,b";
					this.appendLine(value, "text", true);
				}
			}
			else {
				value = "rgb -r,g,b";
				this.appendLine(value, "text", true);
			}
		}

		/**
		 * Command: hex
		 */

		else if (command[0] == "hex") {

			// Si il y a une deuxième commande.
			if (command[1]) {

				// Si la valeur commence bien par un #.
				if (command[1][0] == "#") {
					colorPicker.inputManager(command[1], "hex");

					value = command[1] + " is up and running.";
					this.appendLine(value, "text", true);
				}
				else {
					value = "Invalid HEX value - #xxxxxx";
					this.appendLine(value, "text", true);
				}
			}
			else {
				value = "hex -value";
				this.appendLine(value, "text", true);
			}
		}

		/**
		 * Command: copy
		 */

		else if (command[0] == "copy") {

			if (command[1] == "hex") {
				colorPicker.copyToClipboard(colorPicker.selected_hex);

				value = colorPicker.selected_hex + " copied.";
				this.appendLine(value, "text", true);
			}
			else if (command[1] == "hsl") {
				var color_copy = colorPicker.selected_hsl[0] + "° " + colorPicker.selected_hsl[1] + "% " + colorPicker.selected_hsl[2] + "%";
				colorPicker.copyToClipboard(color_copy);

				value = color_copy + " copied.";
				this.appendLine(value, "text", true);
			}
			else if (command[1] == "rgb") {
				var color_copy = colorPicker.selected_rgb[0] + ", " + colorPicker.selected_rgb[1] + ", " + colorPicker.selected_rgb[2];
				colorPicker.copyToClipboard(color_copy);

				value = color_copy + " copied.";
				this.appendLine(value, "text", true);
			}
			else if (command[1] == "hue") {

				if (command[2] == "hex") {
					var color_copy = "#" + colorPicker.rgbToHex(colorPicker.selected_primary);
					colorPicker.copyToClipboard(color_copy);

					value = color_copy + " copied.";
					this.appendLine(value, "text", true);
				}
				else if (command[2] == "rgb") {
					var color_copy = colorPicker.selected_primary[0] + ", " + colorPicker.selected_primary[1] + ", " + colorPicker.selected_primary[2];
					colorPicker.copyToClipboard(color_copy);

					value = color_copy + " copied.";
					this.appendLine(value, "text", true);
				}
				else {
					values = [
						["copy hue hex", "Copies hue HEX value"],
						["copy hue rgb", "Copies hue RGB value"]
					];

					this.appendLine(values, "text", true);
				}
			}
			else {
				values = [
					["copy hex", "Copies HEX value"],
					["copy hsl", "Copies HSL value"],
					["copy rgb", "Copies RGB value"],
					["copy hue hex", "Copies hue HEX value"],
					["copy hue rgb", "Copies hue RGB value"]
				];

				this.appendLine(values, "text", true);
			}
		}

		/**
		 * Command: scheme
		 */

		else if (command[0] == "scheme") {

			// Si il y a une deuxième commande.
			if (command[1]) {

				// Si on veut lister les thèmes.
				if (command[1] == "list") {
					values = [" * dark", " * default", " * hacker", " * light"];
					this.appendLine(values, "text", true);
				}
				// Si on écrit le nom d'un thème.
				else {
					// Execute la fonction qui met en place le thème. Elle renvoie le nom si il existe.
					var scheme_name = colorPicker.setColorScheme("isExists", command[1]);

					// Si un nom a été renvoyé, le thème est passé.
					if (scheme_name) {

						// Ajoute la ligne en premier, pour que le thème puisse ajouter le style dessus.
						value = "Color scheme \"" + scheme_name + "\" loaded.";
						this.appendLine(value, "text", true);

						// Lance le thème.
						colorPicker.setColorScheme("build", command[1]);
					}
					// Si "false" est renvoyé, le thème n'existe pas.
					else {
						value = "Unknown color scheme.";
						this.appendLine(value, "text", true);
					}
				}
			}
			else {
				values = [
					["scheme list", "List all color schemes"],
					["scheme -name", "Loads color scheme by name"]
				];

				this.appendLine(values, "text", true);
			}
		}

		/**
		 * Command: squaresize
		 */

		else if (command[0] == "squaresize") {

			// Si il y a un deuxième paramètre.
			if (command[1]) {

				var pixel_size = parseInt(command[1]);

				// Si c'est un nombre comprit entre 1 et 15 inclus.
				if (typeof pixel_size == "number" && pixel_size > 0 && pixel_size < 16) {
					// Set la taille des pixels de la palette.
					colorPicker.setSquareSize(pixel_size);

					// Ajoute la valeur dans les cookies.
					colorPicker.setCookie("squaresize", pixel_size, 30);

					value = "Square size changed to " + pixel_size + "x" + pixel_size + " pixels.";
					this.appendLine(value, "text", true);
				}
				else {
					value = "Choose a square size bewteen 1 and 15 pixels included.";
					this.appendLine(value, "text", true);
				}
			}
			else {
				values = [
					"",
					" * This command allows the user to set the square", "size of the color palette.",
					" * If the user is encoutering performance issues, it", " is recommended to increase the pixel size.",
					"",
					"Min: 1 \xa0- 1x1 pixel per color",
					"Min: 15 - 15x15 pixels per color",
					"",
					"squaresize -pixel",
				];

				this.appendLine(values, "text", true);
			}
		}

		/**
		 * Command: exit
		 */

		else if (command[0] == "exit") {
			colorPicker.cmdManager();
		}

		/**
		 * Command: help || ?
		 */

		else if (command[0] == "help" || command[0] == "?") {

			// Montre toutes les commandes.
			if (command[1] == "all") {

				values = [
					["cmd onload [bool]", "Open CMD on load"],
					// ["cmd height -lines", "Set CMD height"],
					["cookie delete all", "Delete all cookies"],
					["cookie delete -name", "Delete cookie by name"],
					["cookie list", "List all cookies"],
					["cookie recette", "Très moelleux"],
					["copy hex", "Copies HEX value"],
					["copy hsl", "Copies HSL value"],
					["copy rgb", "Copies RGB value"],
					["copy hue hex", "Copies hue HEX value"],
					["copy hue rgb", "Copies hue RGB value"],
					["exit", "Exit CMD"],
					["hex -#value", "Inputs HEX value"],
					["rgb -r,g,b", "Inputs RGB value"],
					["scheme list", "List all color schemes"],
					["scheme -name", "Loads color scheme by name"],
					["squaresize -size", "Changes colorpicker's square size"]
				];

				// Ajoute les valeurs formatées.
				this.appendLine(values, "text", true);
			}

			// Montre les commandes principales.
			else {
				values = [
					["help all", "Shows all help commands"],
					["cmd", "Manages colorpicker terminal"],
					["cookie", "Manages cookies"],
					["copy", "Copies different color values"],
					["exit", "Exits CMD"],
					["hex -#value", "Inputs HEX value"],
					["rgb -r,g,b", "Inputs RGB value"],
					["scheme", "Manages color schemes"],
					["squaresize", "Changes colorpicker's square size"]
				];

				// Ajoute les valeurs formatées.
				this.appendLine(values, "text", true);
			}
		}

		// Si il n'y a rien on passe à la ligne.
		else if (command[0] == "");

		// Unknown command.
		else {
			value = "Unknown command.";
			this.appendLine(value, "text", true);
		}

		// Ajoute une nouvelle input à la fin.
		this.appendLine("", "input", false);

		// Finis l'initialisation du CMD.
		this.finishInitializingCmd();
	}


	/**
	 * Cette fonction ajoute une ou plusieurs lignes au cmd.
	 *
	 * @param: string || string array - value     - "cmd"  || ["cmd one", "cmd two"]
	 * @param: string				  - type 	  - "text" || "input"
	 * @param: bool					  - linebreak - true   || false
	 */

	appendLine(value, type, linebreak)
	{
		var html = "";

		// Faire un grand foreach, puis vérifier si array.

		// Si value est un string.
		if (typeof value == "string") {

			// Si la ligne n'a que du texte.
			if (type == "text") {

				html = "<div class=\"cmd-line\" data-number=\"" + this.line_number + "\">" + value + "</div>";
				
				this.line_number++;
			}
			// Si la ligne est un input.
			else if (type == "input") {
				html = "<div class=\"cmd-line\" data-number=\"" + this.line_number + "\"><div class=\"path\">WEB:\\colorpicker></div><input type=\"text\" class=\"cmd-value\" value=\"\"></div>";
				this.line_number++;
			}
		}

		// Si value est un array.
		else {
			// Si value est un array double dimensionnel. Ex : 1 valeur = ["il y a la commande", "et l'explication de celle-ci"].
			if (typeof value[0] == "object") value = this.formatValues(value); // On formate la valeur.

			for (var i = 0; i < value.length; i++) {
				html += "<div class=\"cmd-line\" data-number=\"" + this.line_number + "\">" + value[i] + "</div>";
				this.line_number++;
			}
		}

		// Si il y a un saut de ligne.
		if (linebreak) {
			html += "<div class=\"cmd-line\" data-number=\"" + this.line_number + "\"></div>";
			this.line_number++; // On incrémente le numéro de ligne à chaque ajout de ligne.
		}

		this.cmd_wrapper.insertAdjacentHTML("beforeend", html);
	}


	/**
	 * Cette partie sert à formater les valeurs pour les afficher plus clairement en y ajoutant des espaces.
	 * L'array peut être simple ou double dimensionnel.
	 *
	 * @param: string array - values - ["one", "two"] || [["one", "two"], ["three", "four"]]
	 */

	formatValues(values)
	{
		var longest_value = 0;
		var formated_values = [];

		values.forEach(function(el) {
			if (el[0].length > longest_value) longest_value = el[0].length;
		});

		values.forEach(function(el) {
			var white_space = "";
			for (var i = 0; i < longest_value - el[0].length; i++) {
				white_space += "\xa0";
			}
			formated_values.push(el[0] + white_space + " - " + el[1]);
		});

		return formated_values;
	}
}