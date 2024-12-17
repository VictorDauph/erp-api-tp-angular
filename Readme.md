# **ERP-API : Fake API pour Angular TP**

Ce projet est une **Fake API** écrite en **Node.js** avec **Express** qui utilise des fichiers JSON comme base de données. Elle gère des entités suivantes : **Users**, **Products**, **Orders**, et **Customers**.  
Un système d'authentification basé sur JWT permet la gestion des rôles **admin** et **user**.

---

## **1. Prérequis**

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- **Node.js** (version >= 14)
- **npm** (Node Package Manager)

---

## **2. Installation du projet**

1. **Clonez le projet** :
   ```bash
   git clone https://github.com/votre-repo/erp-api.git
   cd erp-api
   ```

2. **Installez les dépendances** :
   ```bash
   npm install
   ```

3. **Structure des fichiers** :
   Le projet suit cette structure :
   ```
   ERP-API/
   │-- data/
   │   ├── users.json
   │   ├── products.json
   │   ├── orders.json
   │   └── customers.json
   │-- middlewares/
   │   └── authMiddleware.js
   │-- routes/
   │   ├── authRoutes.js
   │   ├── userRoutes.js
   │   ├── productRoutes.js
   │   ├── orderRoutes.js
   │   └── customerRoutes.js
   │-- db.js
   │-- server.js
   │-- package.json
   └── Readme.md
   ```

---

## **3. Lancement du serveur**

Pour démarrer le serveur :

```bash
npm start
```

Le serveur démarre sur l'URL suivante :  
`http://localhost:3000`

---

## **4. Routes disponibles**

Voici les routes disponibles pour chaque entité avec leurs méthodes associées.

### **4.1 Authentification (auth)**

| Méthode | Route           | Description                              |
|---------|-----------------|------------------------------------------|
| `POST`  | `/api/auth/login` | Authentifie un utilisateur et retourne un token JWT. |

#### Exemple de requête `POST /api/auth/login` :
- **Body** :
   ```json
   {
       "username": "admin",
       "password": "admin123"
   }
   ```
- **Réponse** :
   ```json
   {
       "token": "eyJhbGciOiJIUzI1NiIsInR..."
   }
   ```

---

### **4.2 Utilisateurs (users)**

Routes réservées uniquement aux **admins**.

| Méthode  | Route             | Description                             |
|----------|-------------------|-----------------------------------------|
| `GET`    | `/api/users`      | Récupère la liste des utilisateurs.    |
| `GET`    | `/api/users/:id`  | Récupère un utilisateur spécifique.    |
| `POST`   | `/api/users`      | Crée un nouvel utilisateur.            |
| `PUT`    | `/api/users/:id`  | Met à jour un utilisateur existant.    |
| `DELETE` | `/api/users/:id`  | Supprime un utilisateur existant.      |

---

### **4.3 Produits (products)**

| Méthode  | Route               | Description                             |
|----------|---------------------|-----------------------------------------|
| `GET`    | `/api/products`     | Récupère la liste des produits.        |
| `GET`    | `/api/products/:id` | Récupère un produit spécifique.        |
| `POST`   | `/api/products`     | Crée un nouveau produit.               |
| `PUT`    | `/api/products/:id` | Met à jour un produit existant.        |
| `DELETE` | `/api/products/:id` | Supprime un produit existant.          |

---

### **4.4 Commandes (orders)**

| Méthode  | Route             | Description                             |
|----------|-------------------|-----------------------------------------|
| `GET`    | `/api/orders`     | Récupère la liste des commandes.       |
| `GET`    | `/api/orders/:id` | Récupère une commande spécifique.      |
| `POST`   | `/api/orders`     | Crée une nouvelle commande.            |
| `PUT`    | `/api/orders/:id` | Met à jour une commande existante.     |
| `DELETE` | `/api/orders/:id` | Supprime une commande existante.       |

---

### **4.5 Clients (customers)**

| Méthode  | Route                | Description                             |
|----------|----------------------|-----------------------------------------|
| `GET`    | `/api/customers`     | Récupère la liste des clients.         |
| `GET`    | `/api/customers/:id` | Récupère un client spécifique.         |
| `POST`   | `/api/customers`     | Crée un nouveau client.                |
| `PUT`    | `/api/customers/:id` | Met à jour un client existant.         |
| `DELETE` | `/api/customers/:id` | Supprime un client existant.           |

---

## **5. Gestion des rôles et authentification**

1. **Authentification** :
   - Chaque requête (sauf `/api/auth/login`) nécessite un **token JWT**.
   - Ajoutez le token dans l'en-tête `Authorization` :
     ```http
     Authorization: <token>
     ```

2. **Rôle `admin`** :
   - Les routes des utilisateurs (`/api/users/*`) sont réservées aux utilisateurs ayant le rôle **admin**.

---

## **6. Exemples de données**

### **6.1 Exemple `users.json`**
```json
[
    {
        "id": 1,
        "username": "admin",
        "role": "admin",
        "password": "$2a$08$encryptedpassword"
    },
    {
        "id": 2,
        "username": "user1",
        "role": "user",
        "password": "$2a$08$encryptedpassword"
    }
]
```

### **6.2 Exemple `products.json`**
```json
[
    {
        "id": 1,
        "name": "Samsung Galaxy S21",
        "stock": 100
    }
]
```

### **6.3 Exemple `customers.json`**
```json
[
    {
        "id": 1,
        "name": "Jean Dupont",
        "email": "jean.dupont@example.com",
        "phone": "0612345678",
        "address": "12 rue des Lilas, Paris, France"
    }
]
```

---

## **7. Tests avec Postman**

Pour tester l'API :
1. **Authentifiez-vous** avec `/api/auth/login` pour obtenir un token.
2. Ajoutez le **token JWT** dans l'en-tête `Authorization` :
   ```
   Authorization: <token>
   ```
3. Testez les routes suivantes avec les méthodes `GET`, `POST`, `PUT` et `DELETE`.

