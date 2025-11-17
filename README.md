# API Testing - Simple Input/Output

## 1. Register

**POST** `http://localhost:8000/api/accounts/register/`

**Input:**
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123",
    "role": "participant"
}
```

**Output:**
```json
{
    "message": "User created successfully"
}
```

---

## 2. Login

**POST** `http://localhost:8000/api/accounts/login/`

**Input:**
```json
{
    "email": "john@example.com",
    "password": "securePassword123"
}
```

**Output:**
```json
{
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc2Mzk3NTU4MiwiaWF0IjoxNzYzMzcwNzgyLCJqdGkiOiI4ODg3OGFmNjlkZTY0Mjg3OGJmNWU5MzM4YzYxZTVlOSIsInVzZXJfaWQiOiIyIn0.W8HFsEZu5RLV5RpU7RJhnGiLBEScCjkmkqeIP4wz8BY",
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzYzMzc0NTgwLCJpYXQiOjE3NjMzNzA5ODAsImp0aSI6ImQxNWYzZTc1MzNiZTRhMWVhNGQyNWVjNGI5NjIyY2FmIiwidXNlcl9pZCI6IjIifQ.5nFcGDfaEueuNBhymGhwjOoQsYfLK99P_B6ML_mFRFc",
    "user": {
        "id": 2,
        "name": "John Doe",
        "email": "john@example.com",
        "role": "participant"
    }
}
```

---

## 3. Token Refresh

**POST** `http://localhost:8000/api/accounts/token/refresh/`

**Input:**
```json
{
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc2Mzk3NTU4MiwiaWF0IjoxNzYzMzcwNzgyLCJqdGkiOiI4ODg3OGFmNjlkZTY0Mjg3OGJmNWU5MzM4YzYxZTVlOSIsInVzZXJfaWQiOiIyIn0.W8HFsEZu5RLV5RpU7RJhnGiLBEScCjkmkqeIP4wz8BY"
}
```

**Output:**
```json
{
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzYzMzc0NTgwLCJpYXQiOjE3NjMzNzA5ODAsImp0aSI6ImQxNWYzZTc1MzNiZTRhMWVhNGQyNWVjNGI5NjIyY2FmIiwidXNlcl9pZCI6IjIifQ.5nFcGDfaEueuNBhymGhwjOoQsYfLK99P_B6ML_mFRFc",
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc2Mzk3NTc4MCwiaWF0IjoxNzYzMzcwOTgwLCJqdGkiOiIzODBkMDA1YTczZWU0N2RlOWNiOTZhZDhmYTE1OTBhNiIsInVzZXJfaWQiOiIyIn0.8ggoa-ED8weyon9FtdfKQ74SnSnxq9IkUFEICkaLhxU"
}
```

---

## 4. Logout

**POST** `http://localhost:8000/api/accounts/logout/`

**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzYzMzc0NTgwLCJpYXQiOjE3NjMzNzA5ODAsImp0aSI6ImQxNWYzZTc1MzNiZTRhMWVhNGQyNWVjNGI5NjIyY2FmIiwidXNlcl9pZCI6IjIifQ.5nFcGDfaEueuNBhymGhwjOoQsYfLK99P_B6ML_mFRFc
```

**Input:**
```json
{
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc2Mzk3NTc4MCwiaWF0IjoxNzYzMzcwOTgwLCJqdGkiOiIzODBkMDA1YTczZWU0N2RlOWNiOTZhZDhmYTE1OTBhNiIsInVzZXJfaWQiOiIyIn0.8ggoa-ED8weyon9FtdfKQ74SnSnxq9IkUFEICkaLhxU"
}
```

**Output:**
```json
{
    "message": "User logged out successfully"
}
```
