# Projet MongoDB et MQTT
### Ce projet met en œuvre une communication via MQTT entre des producteurs et des consommateurs, avec une base de données MongoDB pour stocker les messages.

## Structure du projet
- main.js : Le point d'entrée principal du projet.
- src/consumer/consumer.js : Script pour démarrer les consommateurs MQTT.
- src/db/mongoHandler.js : Gestionnaire de la base de données MongoDB.
  * Changement de l'URL de connexion pour votre base de données MongoDB :
  ```const client = new MongoClient('mongodb+srv://user:<NOMUTILISATEUR>@cluster0.mongodb.net/'```
- src/mqtt/mqttHandler.js : Gestionnaire des connexions et des opérations MQTT.
- src/producer/producer.js : Script pour démarrer les producteurs MQTT.
- src/queue/messageQueue.js : Gestionnaire de la file de messages.

## Installation
Pour installer les dépendances et configurer le projet, suivez les étapes ci-dessous :

1- Clonez le dépôt :
* ```git clone https://github.com/Lekta23/projet_mongo_mqtt.git```
* ```cd projet_mongo_mqtt-master```

2- Installez les dépendances :
* ```npm install```

## Utilisation
Pour démarrer le projet, exécutez simplement la commande suivante :
* ```npm start```

Le script main.js initialisera MongoDB, chargera les messages non validés pour deux topics (topic1 et topic2), puis démarrera deux producteurs et trois consommateurs comme suit :

1- Producteurs :
- topic1
- topic2

2- Consommateurs :
- consumer1 pour topic1
- consumer2 pour topic2
- consumer3 pour topic2

## Fichiers et fonctionnalités
### main.js
Ce fichier est le point d'entrée principal du projet. Il initialise la base de données MongoDB, charge les messages non validés, puis démarre les producteurs et les consommateurs.

### package.json
Ce fichier contient les métadonnées du projet et les dépendances nécessaires :

- mongodb : Pour l'interaction avec MongoDB.
- mqtt : Pour la communication MQTT.
- chai et mocha : Pour les tests unitaires.

### src/consumer/consumer.js
Gère les consommateurs MQTT, abonnés à différents topics pour recevoir les messages et les traiter.

### src/db/mongoHandler.js
Gère la connexion et les opérations avec la base de données MongoDB.

### src/mqtt/mqttHandler.js
Gère la connexion et les opérations avec le broker MQTT.

### src/producer/producer.js
Gère les producteurs MQTT, publiant des messages sur différents topics.

### src/queue/messageQueue.js
Gère la file de messages en attente de traitement.

![image](https://github.com/Lekta23/projet_mongo_mqtt/assets/61836866/fbef7445-c7a4-4b02-b38b-dc329ceb8011)
### Voici le schéma de deux sujets (Topics) qui sont connectés à trois clients (Customers).
- Topic 1 est un canal de communication où les messages sont publiés. Customer 1 est un consommateur qui reçoit et traite les messages de Topic 1.
- Topic 2 est un autre canal de communication. Customer 2 et Customer 3 sont des consommateurs qui reçoivent et traitent les messages de Topic 2.
Cela signifie que Customer 1 est abonné à Topic 1, tandis que Customer 2 et Customer 3 sont abonnés à Topic 2.

![image](https://github.com/Lekta23/projet_mongo_mqtt/assets/61836866/57c9542e-a400-482d-be44-ad2e65e74b1e)
### Schéma du flux de traitement des messages dans un système utilisant MQTT et MongoDB.

