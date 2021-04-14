# Liste des fonctionnalites
1. Liste des devoirs repartis en deux onglets "Rendu" et "Non Rendu" avec Scrolling Infini
2. Recherche de devoirs par nom de l'eleve
3.  Ajout d'un devoir (en etant connecte uniquement)
4. Connexion en tant que professeur (JWT) et deconnexion
  a. Utilisateur:tokiniainaherve.andrianarison@gmail.com
  b. Mot de passe:tokypass
5.Suppression et modification d'un devoir (en etant connecte uniquement)
6.Peupler la base de donnees de 500 devoirs (en etant connecte uniquement)
7.Permet de glisser un devoir rendu en non rendu depuis la liste des devoirs (drag)
8.Divers:
  a.message d'erreur lors de l'echec ou succes d'un traitement
  b.ajout d'un loader
  c.dialogue de confirmation qui apparait lorsque l'on rend un devoir

## Developpenent en local

1.Cloner ce projet frontEnd et le projet backend : https://github.com/mamy1310/Backend-Assignment-MEAN-MBDS.git 
2.Dans le projet frontEnd, changez la variable "uri" dans "src/app/shared/assignments.service.ts" et "src/app/shared/auth.service.ts"  en http://localhost:8010/api/assignments
3.lancer la commande "node server.js" dans le projet backend
4.lancer la commande "ng serve" dans le projet frontEnd
5.Ouvrir le navigateur et accedez a http://localhost:4200/

## Sources externes utilises
1.JWT:https://www.freecodecamp.org/news/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52/
2.Angular drap and drop:https://material.angular.io/cdk/drag-drop/overview


