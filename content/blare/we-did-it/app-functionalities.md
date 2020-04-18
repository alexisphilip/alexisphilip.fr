# Fonctionnalités de l'application

Blare est une application de micro-blogging proposant de multiples fonctionnalités.

## Création de compte utilisateur

De manière à profiler pleinement des services de Blare, l'utilisateur peut créer un compte.

Après création de son compte, l'utilisateur peut :

- Mettre-à-jour son avatar ;
- Mettre-à-jour son e-mail ;
- Mettre-à-jour son mot de passe.

Mettre-à-jour son e-mail ou mot de passe notifiera l'utilisateur par e-mail.

![alt text](https://alexisphilip.fr/blare/we-did-it/img/sign-in.png "Sign-in form.")

Formulaire de création de compte utilisateur.

## CRUD de posts

Un utilisateur connecté sur son compte peut créer un post contenant un titre (obligatoire) et un contenu (du texte ou 
une image **PNG, JPG, JPEG, GIF**).

Il peut également modifier le titre ou le contenu texte, ou supprimer sa publication. Si le post est supprimé, une 
trace sera gardée dans son historique d'activité et il sera marqué **supprimé**.

## CRUD de commentaires

Un utilisateur connecté sur son compte peut créer des commentaires. Le commentaire peut être crée sur post ou en tant 
que réponse d'un autre commentaire.

L'utilisateur peut modifier son commentaire ou le supprimer. Si il le supprime, le commenaitre sera toujours présent 
dans son historique et marqué **supprimé**.

## Blarys

Les Blarys sont des catégories ou des *pages* dans lesquelles les utilisateurs connectés peuvent créer des posts.

> Chaque post est lié à un Blary. De cette manière là, les posts se regroupent en catégories, permettant à l'utilisateur
de suivre différentes catégories grace aux Blarys.

Chaque Blary à été créé par un utilisateur agréé. Il sont administrés par des modérateurs. Ces derniers ont le pouvoir
de reporter les posts hors catégorie, ou supprimer les posts ne respectant pas la 
[politique de contenu de Blare](https://blare.alexisphilip.fr/content-policy).

![alt text](https://alexisphilip.fr/blare/we-did-it/img/blary.png "Sign-in form.")

Exemple du Blary **Keyboards**.

## Votes

Un utilisateur connecté peut voter des posts et commentaires. Il servent à référencer les meilleurs posts et 
commentaires.

Dans les posts, les commentaires sont affichés par défaut par nombre de votes.

L'utilisateur peut voter de manière positive (ajoute un point) ou de manière négative (retire un point).

## Follow

Un utilisateur connecté peut suivre (ou dans le cas contraire arrêter de suivre) :

- un utilisateur ;
- un Blary.

Suivre un **utilisateur** résulte à la notification par mail tous les soirs de ce dernier (fonctionnalité en cours de 
développement).

Suivre un **Blary** résulte à la l'affichage de ses posts dans le fil d'actualité de la [page d'accueil](https://blare.alexisphilip.fr/home).

![alt text](https://alexisphilip.fr/blare/we-did-it/img/follow-user.png "Follow user button.")

Exemple du bouton follow d'un utilisateur.