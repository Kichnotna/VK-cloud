# VK-cloud
***
## Description
* ### lab 1
   Серверная часть приложения (Spring Boot)
* ### lab 2
   Клиентская часть приложения (React)
***
## API

* ### GET /s3/files
   Получение списка всех файлов из s3
* ### GET /s3/files/{fileName}
   Получение конкретного файла из s3, по его полному имени
* ### POST /s3/files/{fileName}
   Добавление нового файла в s3, по его полному имени
* ### DELETE /s3/files/{fileName}
   Удаление конкретного файла из s3, по его полному имени
* ### GET /cv/detect/{fileName}
   Получение изображения из s3, отправка его в CV для определения изображённых объектов,
   и рисование прямоугольника поверх изображения с помощью Graphics2D и добавление
   его в s3 с потсфиксом наименования обнаруженного объекта.
***
## Kubernetes
### Files to deploy
      lab 1/service.yaml
      lab 1/deployment.yaml
      lab 1/Dockerfile
***
