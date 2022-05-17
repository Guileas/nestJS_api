# Prérequis

- Assurez-vous d'avoir Docker et docker-compose d'installer

# Démarrage

- Lancer ```cp .env.dist .env```
- Pour lancer le projet utilisez la commande: ```docker-compose up -d```
- L'api sera disponible à l'adresse: ```http://localhost:2000```

Pour redémarrer le projet :
```docker-compose down && docker-compose up -d```

# Base de données :

Dans un nouveau terminal, lancer la commande ```yarn prisma studio```
La base de donnée sera accessible à l'adresse ```http://localhost:5555/```

# Doc

- La documentation de l'API est disponible à l'adresse: ```http://localhost:2000/api/```


# Tester les routes

Pour tester les requêtes en tant qu'utilisateur authentifié, vous pouvez utiliser CURL voici quelques exemples d'utilisations

En appelant la route de login avec un des utilisateurs existants un token lié à cet utilisateur sera ajouté dans la table ```authToken``` vous pourrez l'utiliser pour réaliser les requêtes en tant qu'utilisateur authentifié en remplaçant ```{AUTH_TOKEN}``` dans vos requêtes CURL

### Récupérer la liste des produits pour un utilisateur authentifié

```
curl -X 'GET' \
  'http://localhost:2000/v1/products' \
  -H 'accept: */*' \
  -H "Authorization: {AUTH_TOKEN}"
```

### Déconnecter un utilisteur

```
curl -X 'POST' \
  'http://localhost:2000/v1/auth/logout' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -H "Authorization: {AUTH_TOKEN} \
  -d '{
      "userId": {USER_ID}
  }'
```