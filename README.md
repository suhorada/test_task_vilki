# Backend test task (Forks)
## Коллекционирование вилок

Проект разработан в качестве тестового задания back-end
Проект использует npm.
## Техническое задание:
Я заказчик, и я хочу продукт для коллекционеров Вилок ( те что столовые приборы ).
* Что продукт должен уметь:
* Регистрировать новых пользователей
* Авторизировать пользователей с помощью JWT и RefreshToken
* Позволять авторизованным пользователям:
* Получить все вилки ( необходима пагинация )
* Получить все вилки из определенной категории ( необходима пагинация )
* Создать вилку
* Подписаться на создание новых вилок в категории 
( имеется в виду, что если пользователь подписан на создание вилки в категории А, то когда новая вилка будет добавлена в категорию А, то пользователь получит уведомление ). Реализовать данную фичу необходимо с использованием очередей. Уведомления можно реализовать с помощью console.log ( имеется ввиду вывод в консоль сообщения вида “Send notification to Ivan about new fork in category A”
## Ограничения:
* Применение всех принципов SOLID
* Необходим Dockerfile
* Необходимо обосновать выбор технологий, которые будут использованы в продукте
* Нельзя использовать Passport.js


## Запуск проекта 
Для запуска проекта локально необходимо: 
1. Склонировать репозиторий;
2. Установить необходимы пакеты и зависимости, выполнив команду: 
```
npm install
```
3. Установиь sequelize cli глобально
```
npm install sequelize-cli -g
```
4. Создать базу данных с необходимым названием
5. В config.json настроить подключение к БД
6. Установиь sequelize cli глобально
```
npm install sequelize-cli -g
```
6. Запустить миграцию
```
sequelize db:migrate
```
7. Выполнить запуск приложения командой: 
```
npm start
```
P.S. Может потребоваться синхронизация: в файле index.js моделей раскоментировать 
```
sequelize.sync({ force: true });
```
перезапустить проект и закоментировать обратно
P.P.S Если есть данные в БД они будут удалены!!!

## Api
### User
* POST: localhost:3000/user/signup
body = { login, password, email }

* POST: localhost:3000/user/login
body = { login: login || email, password }

* POST: localhost:3000/user/token
body = { refreshToken }

### Categories
* POST: localhost:3000/category
body = { name, description }
headers = { auth-token }

### Subscribes
* POST: localhost:3000/subscribes/:id
headers = { auth-token }
params = { id: categoryId }

* POST: localhost:3000/subscribes/remove/:id
headers = { auth-token }
params = { id: categoryId }

### Forks
* POST: localhost:3000/fork?category
body = { name, description, year, category }
headers = { auth-token }

* GET: localhost:3000/fork?&page
headers = { auth-token }
query: { page }

* GET: localhost:3000/vilka?category&page
headers = { auth-token }
query: { category: categoryId, page }
