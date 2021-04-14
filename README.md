# Liste des fonctionnalites
1.&nbsp;&nbsp;Liste des devoirs repartis en deux onglets "Rendu" et "Non Rendu" avec Scrolling Infini <br /><br />
2.&nbsp;&nbsp;Recherche de devoirs par nom de l'eleve <br /><br />
3.&nbsp;&nbsp;Ajout d'un devoir (en etant connecte uniquement) <br /><br />
4.&nbsp;&nbsp;Connexion en tant que professeur (JWT) et deconnexion <br /><br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a. Utilisateur: tokiniainaherve.andrianarison@gmail.com <br /><br />
	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b. Mot de passe: tokypass <br /><br />
5.&nbsp;&nbsp;Suppression et modification d'un devoir (en etant connecte uniquement) <br /><br />
6.&nbsp;&nbsp;Peupler la base de donnees de 500 devoirs (en etant connecte uniquement) <br /><br />
7.&nbsp;&nbsp;Permet de glisser un devoir rendu en non rendu depuis la liste des devoirs (drag) <br /><br />
8.&nbsp;&nbsp;Divers: <br />
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a.message d'erreur lors de l'echec ou succes d'un traitement <br /><br />
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b.ajout d'un loader <br /><br />
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c.dialogue de confirmation qui apparait lorsque l'on rend un devoir <br /><br />

## Developpenent en local

1.&nbsp;&nbsp;Cloner ce projet frontEnd et le projet backend : https://github.com/mamy1310/Backend-Assignment-MEAN-MBDS.git  <br /><br />
2.&nbsp;&nbsp;Dans le projet frontEnd, changez la variable "uri" dans "src/app/shared/assignments.service.ts" et "src/app/shared/auth.service.ts"  en http://localhost:8010/api/assignments <br /><br />
3.&nbsp;&nbsp;lancer la commande "node server.js" dans le projet backend <br /><br />
4.&nbsp;&nbsp;lancer la commande "ng serve" dans le projet frontEnd <br /><br />
5.&nbsp;&nbsp;Ouvrir le navigateur et accedez a http://localhost:4200/ <br /><br />

## Sources externes utilises
1.&nbsp;&nbsp;JWT:https://www.freecodecamp.org/news/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52/ <br /><br />
2.&nbsp;&nbsp;Angular drap and drop:https://material.angular.io/cdk/drag-drop/overview<br /><br />


