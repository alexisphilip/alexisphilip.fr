# Framework PHP

## Présentation 

Birdy est le framework PHP utilisé pour ce projet. Il a été conçu et développé au préalable du développement de Blare, 
pour Blare.

> [Documentation complète de Birdy](https://birdy.alexisphilip.fr/#/)

## Fonctionnalités

Birdy propose de multiples fonctionnalités natives.

- Architecture MVC ;
- Auto chargement (groupes de CSS, JS, etc) ;
- Patrons de vues ;
- Multiples connexions de bases de données ;
- Multi-langues.

## Architecture MVC

Créer une application web de micro-blogging nécessite une certaine rigueur dans la conception de l'architecture PHP.

L'architecture de ce projet suit le **patron de conception M.V.C. (orienté web)**. Ce patron de conception est très utilisé dans le web et 
nous avons trouvé qu'il était nécessaire de le mettre en place pour l'application.

Suite à une requête HTTP, le routeur (instancié depuis **index.php**) instancie le contrôlleur. Celui-ci instancie des 
modèles qui traitent des données, puis inclus une ou plusieurs view grâce aux templates.

> En apprendre plus sur l'[architecture de Birdy](https://birdy.alexisphilip.fr/tutorial/#/architecture)

## Auto-chargement

Birdy propose l'auto chargement des :

- assets (fichiers CSS et JS) ;
- helpers (scripts PHP utilisables dans la vue) ;
- traduction (fichiers de traduction).

Les scripts peuvent être [chargés manuellement](http://birdy.alexisphilip.fr/docs/#/assets-loading?id=manual-loading) 
depuis le contrôlleur ou [automatiquement](http://birdy.alexisphilip.fr/docs/#/assets-loading?id=auto-loading) depuis 
le fichier de configuration "**autoloading**".

Il est également possible de 
[définir des groupes](http://birdy.alexisphilip.fr/docs/#/assets-loading?id=auto-load-groups-of-files) pour charger ces 
fichiers en groupe avec qu'un seul appel.

> En apprendre plus sur l'[auto-chargement](http://birdy.alexisphilip.fr/docs/#/assets-loading).

## Patrons de vues

Il est possible de définir plusieurs patrons de vues, appelablles depuis le 
[contrôlleur](http://birdy.alexisphilip.fr/docs/#/controller?id=view).

> En apprendre plus sur les [patrons de vues](http://birdy.alexisphilip.fr/docs/#/first-page?id=create-a-template).

## Connexions bases de données multiples

Birdy propose de manière native la connexion à multiples bases de données.

Il faut [définir les informations de connexion](http://birdy.alexisphilip.fr/docs/#/fetching-data?id=from-the-model) 
aux bases de données dans le fichier de configuration, puis 
[instancier la / les connexions](http://birdy.alexisphilip.fr/docs/#/fetching-data?id=from-the-model) depuis le modèle 
dans le constructeur.

## Multi-langues

Birdy permet de définir des traductions pour l'application.

Quand le multi-langue est activé, l'URL est réécrit (redirigé) :

Requête :

```text
domain.tld/controller_name
```

Redirection vers le language du navigateur, ou language par défaut si celui-ci n'est pas définit dans Birdy.

```text
domain.tld/LANGUAGE_CODE/controller_name
```

Après avoir [configuré le multi-langue](http://birdy.alexisphilip.fr/docs/#/multi-language?id=configuration), il faut
définir la [traduction des vues et des composants](http://birdy.alexisphilip.fr/docs/#/multi-language?id=translation-files)

Chaque vues doivent être traduites dans son fichier `.json` correspondant. Il est également possible de définir des 
[components](http://birdy.alexisphilip.fr/docs/#/multi-language?id=other-translations-components).

> En apprendre plus sur le [multi-langue](http://birdy.alexisphilip.fr/docs/#/multi-language).