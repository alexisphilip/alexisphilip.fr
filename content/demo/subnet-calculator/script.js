/* À faire !

	- utiliser bitsArrayToBytesArray() partout.

	- two dimentional array
	array(32) [
	1-
	  1- [1,1,0,0,0,0,0,0]
	  2- [1,1,0,0,0,0,0,0]
	  3- [1,1,0,0,0,0,0,0]
	  4- [1,1,0,0,0,0,0,0]

	2-
	  1- [1,1,0,0,0,0,0,0]
	  2- [1,1,0,0,0,0,0,0]
	  3- [1,1,0,0,0,0,0,0]
	  4- [1,1,0,0,0,0,0,0] etc...
	]

*/




/* FONCTIONS PRELIMINAIRE */
/* ###################### */


/* Pour chaque clic */
document.addEventListener('click', (e) => {

    // Si l'élément cliqué est un TD ou un SPAN
    if (e.target.tagName == "SPAN" || e.target.tagName == "TD") {
        copyAndModal(e);
    }

},false);


// Trigger animation à chaque clic de "span" ou "td"
function copyAndModal(e) {
    // Sélectionne le contenu de l'élément
    var content = e.target.innerText;
    // Crée une zone de texte
    var tArea = document.createElement("textarea");
    // Ajoute le contenu dans la zone de texte
    tArea.value = content;
    // Document devient non éditable
    tArea.setAttribute("readyonly", "");
    tArea.style = {position: 'absolute', left: '-9999px'};
    // Ajoute la zone de texte dans le code HTML
    document.body.appendChild(tArea);
    // Sélectionne le text dans l'élément
    tArea.select();
    // Copie le texte dans la zone de texte
    document.execCommand("copy");
    // Supprime la zone de texte du code HTML
    document.body.removeChild(tArea);

    // Affiche la modal
    var modalCopy = document.querySelector(".modal-container");
    // Suppression de la classe animation
    modalCopy.classList.remove("animation");
    modalCopy.offsetWidth;
    // Ajout de la classe animation
    modalCopy.classList.add("animation");
}







setInterval(IP_Converter, 50);
IP_Converter();


function IP_Converter() {
    var IP = document.querySelector("#ip_input").value;
    var MASK_32 = document.querySelector("#mask_input").value;

    // IP dans un array
    var array_IP = IP.split(".");

    var IP_BINARY = integersToBinaries(array_IP);
    var MASK_BINARY = maskIntegerToBinaries(MASK_32);
    var MASK = binariesToIntegers(MASK_BINARY);
    var MACHINES = machinesAvaliable(MASK_32);
    var SUBNET_ID_BINARY = subnetAddress(IP_BINARY, MASK_BINARY);
    var SUBNET_ID = binariesToIntegers(SUBNET_ID_BINARY);

    var result_calculation = rangeCalculation(SUBNET_ID_BINARY, MASK_BINARY); // Retourne le talbeau contenant les 4 tableaux (first_host, last_host, broadcast).
    var FIRST_HOST_BINARY = result_calculation[0];
    var FIRST_HOST = binariesToIntegers(result_calculation[0]);
    var LAST_HOST_BINARY = result_calculation[1];
    var LAST_HOST = binariesToIntegers(result_calculation[1]);
    var BROADCAST_BINARY = result_calculation[2];
    var BROADCAST = binariesToIntegers(result_calculation[2]);


    document.querySelector("#IP").innerHTML = IP + " /" + MASK_32;
    document.querySelector("#IP_BINARY").innerHTML = arrayToString(IP_BINARY, "binary");
    document.querySelector("#MASK").innerHTML = arrayToString(MASK);
    document.querySelector("#MASK_BINARY").innerHTML = arrayToString(MASK_BINARY, "binary");
    document.querySelector("#MACHINES").innerHTML = MACHINES;
    document.querySelector("#SUBNET_ID").innerHTML = arrayToString(SUBNET_ID);
    document.querySelector("#SUBNET_ID_BINARY").innerHTML = arrayToString(SUBNET_ID_BINARY, "binary");
    document.querySelector("#FIRST_HOST").innerHTML = arrayToString(FIRST_HOST);
    document.querySelector("#FIRST_HOST_BINARY").innerHTML = arrayToString(FIRST_HOST_BINARY, "binary");
    document.querySelector("#LAST_HOST").innerHTML = arrayToString(LAST_HOST);
    document.querySelector("#LAST_HOST_BINARY").innerHTML = arrayToString(LAST_HOST_BINARY, "binary");
    document.querySelector("#BROADCAST").innerHTML = arrayToString(BROADCAST);
    document.querySelector("#BROADCAST_BINARY").innerHTML = arrayToString(BROADCAST_BINARY, "binary");




    /* FONCTIONS PRINCIPALES */
    /* ##################### */


    /* Converts "arrays" to "strings" to display.
        /!\ add the parameter "binary" to the method if you want to display binaries.
        /!\ add nothing if you want do display an IP address.
    */
    function arrayToString(array, parameter) {
        if (parameter == "binary") {
            return array.join(" ");
        }
        else {
            return array.join(".");
        }
    }



    /* 32 BITS MASK "integer" to BINARIES
        Entry:  INTEGER (0 to 32)	string(1-2)	 ex: 24
        Output: BINARIES 			array[4]	 ex: 11111111.11111111.11111111.00000000

        This methods converts an "integer" 32 BIT MASK to "binaries" BITS.
    */
    function maskIntegerToBinaries(bits) {
        var pre_result = [];		 // Tableau de 32 bits.
        var result = [];			 // Résultat final, 4 octets.
        var bit_restant = 32 - bits; // Calcule le nombre de bits à 0

        for (i = 0; i < bits; i++) { // Remplissage du tableau par les 1
            pre_result.push(1);
        }
        for (i = 0; i < bit_restant; i++) { // Finissage du remplissage par les 0
            pre_result.push(0);
        }

        /* Construction du tableau final contenant :
            - 4 valeurs (4 bytes) de chacune 8 bits
        */
        for (i = 0; i < 4; i++) { // Boucle 4 fois pour les 4 bytes de 8 bits
            var array = [];
            for (x = 0; x < 8; x++) { // Boucle 8 fois pour les 8 bits
                array.push(pre_result[0]); 	// On ajoute la première valeur
                pre_result.shift(); 		// On supprime la première valeur
            }
            result.push(array.join(""));
        }

        return result;
    }


    /* X BYTES -> X INTEGERS to X BINARIES

        Entry:  INTEGER  array[1-x] (string)
        Output: BINARIES string(1-x)

        This method converts X "integers" bytes to X "binaries" bytes.
        It loops the method "integerToBinary()".
    */
    function integersToBinaries(integers) {
        var result = [];

        for (i = 0; i < integers.length; i++) {
            result.push(integerToBinary(integers[i]));
        }

        return result;
    }


    /* X BYTES -> X BINARIES to X INTEGERS

        Entry:  BINARIES array[1-x] (string)  ex: ["11111111","11111111","00000000"]
        Output: INTEGER  string(1-x)		  ex: "255.255.0"

        This method converts X "integers" bytes to X "binaries" bytes.
        It loops the method "integerToBinary()".
    */
    function binariesToIntegers(binaries) {
        var result = [];

        for (i = 0; i < binaries.length; i++) {
            result.push(binaryToInteger(binaries[i]));
        }

        return result;
    }


    // Calculates the numbers of machines avaliable
    function machinesAvaliable(MASK_32) {
        return Math.pow(2,(32 - MASK_32)) - 2;
    }

    // Calculates SUBNET ADDRESS from IP (binary array) and MASK (binary array)
    function subnetAddress(ip, mask) {
        var result = [];

        for (i = 0; i < ip.length; i++) {
            var ip_sub_array = [];
            var mask_sub_array = [];
            var pre_result = [];

            // Les deux strings deviennent des arrays
            ip_sub_array = ip[i].split("");
            mask_sub_array = mask[i].split("");

            for (x = 0; x < ip_sub_array.length; x++) {
                if (ip_sub_array[x] == 1 && mask_sub_array[x] == 1) {
                    pre_result.push(1);
                }
                else {
                    pre_result.push(0);
                }
            }
            result.push(pre_result.join(""));
        }

        return result;
    }


    function rangeCalculation(subnet_binary, mask_binary) {

        var pre_subnet = []; // Array contenant tous les bits du subnet ID dans chaque case.

        for (i = 0; i < subnet_binary.length; i++) {
            pre_subnet = pre_subnet.concat(subnet_binary[i].split(""));
        }

        // Array contenant le premier hote, fait à partir du subnet ID en remplaçant le dernier bit par 1
        var pre_first_host = pre_subnet.slice();
        pre_first_host.pop();
        pre_first_host.push("1");

        var bit_restant = 32 - MASK_32;

        for (i = 0; i < bit_restant; i++) { // Suppression des bits côté hote qui seront remplacés par des 0 et 1
            pre_subnet.pop();
        }

        for (i = 1; i < bit_restant; i++) { // Ajout des derniers bits à 1. On ajoute 1 de moins donc l'array sera de 31 valeurs. On ajoutera le dernier bit en fonction de la dernière adresse ou du broadcast.
            pre_subnet.push("1");
        }

        // Copie de l'array "pre_subnet" dans deux nouveaux arrays
        var pre_last_host = pre_subnet.slice();
        var pre_broadcast = pre_subnet.slice();

        pre_last_host.push("0"); // Ajout du dernier bit à 0 ou à 1
        pre_broadcast.push("1");


        // Transformations des arrays 32 valeurs en 4 valeurs (8 bits dans chaque)

        var arrayGlobal = [pre_first_host, pre_last_host, pre_broadcast]; // Array double dimentionnel contenant les 3 arrays de 32 bits (1 bit par élément).
        var finalArray = []; // Array final contenant les arrays de 4 octets (1 octet par élément).

        for (i = 0; i < arrayGlobal.length; i++) { // Boucle de l'array général, traitant les trois tableaux à la suite.

            var newElement = bitsArrayToBytesArray(arrayGlobal[i]);
            finalArray.push(newElement);
        }

        // var first_host = finalArray[0];
        // var last_host = finalArray[1];
        // var broadcast = finalArray[2];

        return finalArray;
    }





    /* ROOT METHODS */
    /* ############ */


    /* 32 ELEMENTS ARRAY to 4 ELEMENTS ARRAY

        Entry:  32 bits, 1 bit per element   ex: [1,1,0,0,...]
        Output: 4 bytes, 1 byte per element  ex: [1100, ...]
    */
    function bitsArrayToBytesArray(array) {

        for (x = 0; x < 4; x++) { // Boucle 4 fois pour les 4 bytes de 8 bits

            var pre_array = [];
            for (y = 0; y < 8; y++) { // Boucle 8 fois pour les 8 bits
                pre_array.push(array[0]); // On ajoute la première valeur
                array.shift(); // On supprime la première valeur
            }

            array.push(pre_array.join(""));
        }

        return array;
    }


    /* 1 BYTE -> 8 BINARIES to 1 INTEGER

        Entry:  BINARY  string(8)		ex: 10101000	(00000000-11111111)
        Output: INTEGER string(1-3)		ex: 168			(0-255)

        This method converts 1 "binary" byte to 1 "integer" byte.
    */

    function binaryToInteger(binary) {
        var bits = [128,64,32,16,8,4,2,1];
        var result = 0;

        binary = binary.split("");

        for (x = 0; x < binary.length; x++) {
            if (binary[x] == 1) {
                result += bits[x];
            }
        }

        return result.toString();
    }


    /* 1 BYTE -> 1 INTEGER to 8 BINARIES

        Entry:  INTEGER string(1-3)		ex: 23			(0-255)
        Output: BINARY  string(8)		ex: 00010111	(00000000-11111111)

        This method converts 1 "integer" byte to 1 "binary" byte.
    */
    function integerToBinary(integer) {

        var pre_result = []; /* Le pré-résultat sera le résultat binaire sans les zéros devant
		(ex: 1101 la fonction "addZero()"" elle les rajoutera | ex: 00001101) */

        /* Pour une explication de la méthode mathématique de calcul d'entier en binaire,
        regarder sur internet (on divise par deux et le reste est soit bit à 1 ou 0) */
        while (integer > 0) {
            integer /= 2; 				// Division de l'entier par 2

            if (integer % 1 !== 0) {	// Si le quotient est un chiffre décimal :
                integer -= 0.5;		// On lui soutrait 0.5
                pre_result.unshift(1);  // On ajoute au début du tableau 1
            }
            else { 						// Si le quotient est un entier :
                pre_result.unshift(0);	// On ajoute au début du tableau 0
            }
        }

        pre_result = pre_result.join(""); // "array" to "string"

        function addZero(result) { // Fonction d'ajout des zéros.
            var result = result.split("");

            if (result.length < 8) { /* Si le résultat à une chaîne de caractères inférieure à 8, on ajoute tant de zéros au début de la chaîne pour que sa longueur soit égale à 8
				- (ex: 1101 devient 00001101) */

                var add = 8 - result.length; // Calcul du nombre de zéros à ajouter au début

                for (x = 0; x < add; x++) {
                    result.unshift("0");
                }
            }
            return result.join("");
        }
        return addZero(pre_result);
    }
}
