Voici un exemple de fichier `README.md` bien structuré pour votre API :

---

# ERP API - Gestion de Stocks, Produits, Commandes et Utilisateurs

Cette API est un exemple d'application ERP minimaliste construite avec Node.js et Express. Elle permet de gérer les produits, les commandes, les utilisateurs et propose un système d'authentification JWT.

---

## **Installation**

### 1. **Cloner le projet**
```bash
git clone <url_du_repository>
cd erp-api
```

### 2. **Installer les dépendances**
Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé, puis exécutez :
```bash
npm install
```

### 3. **Démarrer l'API**
```bash
node server.js
```

L'API sera disponible par défaut sur `http://localhost:3000`.

---

## **Données Initiales**

L'API utilise des fichiers JSON pour simuler une base de données, placés dans le dossier `data/` :
- `users.json`: Données des utilisateurs inscrits.
- `products.json`: Données des produits.
- `orders.json`: Données des commandes.

---

## **Routes Disponibles**

### **1. Authentification**

#### **POST** `/auth/login`
Authentifiez un utilisateur pour obtenir un token JWT.
/!\ Le mot de passe de tous les utilisateurs est pwd

- **Corps de la requête :**
  ```json
  {
    "username": "admin",
    "password": "pwd"
  }
  ```

- **Réponse :**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

---

### **2. Produits**

#### **GET** `/products`
Récupérer tous les produits.

- **En-tête :**
  ```plaintext
  Authorization: <votre_token>
  ```

- **Réponse :**
  ```json
  [
    {
      "id": 1,
      "name": "Product A",
      "stock": 100
    },
    {
      "id": 2,
      "name": "Product B",
      "stock": 50
    }
  ]
  ```

#### **POST** `/products`
Ajouter un nouveau produit.

- **En-tête :**
  ```plaintext
  Authorization: <votre_token>
  ```

- **Corps de la requête :**
  ```json
  {
    "name": "Product C",
    "stock": 30
  }
  ```

- **Réponse :**
  ```json
  {
    "id": 3,
    "name": "Product C",
    "stock": 30
  }
  ```

---

### **3. Commandes**

#### **GET** `/orders`
Récupérer toutes les commandes.

- **En-tête :**
  ```plaintext
  Authorization: <votre_token>
  ```

- **Réponse :**
  ```json
  [
    {
      "id": 1,
      "productId": 1,
      "quantity": 10,
      "userId": 1,
      "createdAt": "2024-12-01T10:30:00Z"
    },
    {
      "id": 2,
      "productId": 2,
      "quantity": 5,
      "userId": 1,
      "createdAt": "2024-12-05T14:15:00Z"
    }
  ]
  ```

#### **POST** `/orders`
Créer une nouvelle commande.

- **En-tête :**
  ```plaintext
  Authorization: <votre_token>
  ```

- **Corps de la requête :**
  ```json
  {
    "productId": 1,
    "quantity": 5
  }
  ```

- **Réponse :**
  ```json
  {
    "id": 3,
    "productId": 1,
    "quantity": 5,
    "userId": 1,
    "createdAt": "2024-12-10T12:45:00Z"
  }
  ```

---

### **4. Utilisateurs**

#### **GET** `/users`
Récupérer la liste des utilisateurs sans afficher les mots de passe.

- **En-tête :**
  ```plaintext
  Authorization: <votre_token>
  ```

- **Réponse :**
  ```json
  [
    {
      "id": 1,
      "username": "admin",
      "role": "admin"
    },
    {
      "id": 2,
      "username": "Jean",
      "role": "user"
    },
    {
      "id": 3,
      "username": "Alice",
      "role": "user"
    }
  ]
  ```

---

## **Authentification JWT**

- Toutes les routes (sauf `/auth/login`) nécessitent un token JWT valide dans l'en-tête `Authorization`.
- Exemple d'en-tête :
  ```plaintext
  Authorization: <votre_token>
  ```

---

## **Personnalisation**

Vous pouvez modifier les données initiales dans les fichiers JSON situés dans `data/`. Par exemple, ajoutez des utilisateurs ou produits dans `users.json` ou `products.json`.

---

## **Licence**

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, de le modifier et de le redistribuer.

--- 

### Amusez-vous avec votre API ! 🚀