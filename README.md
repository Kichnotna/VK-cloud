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
### Files for deploy
      lab 1/service.yaml                             -- kubernetes deployment
      lab 1/deployment.yaml                          -- kubernetes service
      lab 1/Dockerfile                               -- docker image
### Main commands
      1. minikube start                              -- запуск minikube
      2. kubectl apply -f deployment.yaml            -- применение deployment
      3. kubectl apply -f service.yaml               -- применение service
      4. kubectl get all                             -- получения списка всех ресурсов
      5. minikube dashboard                          -- запуск графического интерфейса для minikube
      6. minikube tunnel                             -- запуск tunnel для локальных запросов
      7. kubectl logs <pod-name>                     -- просмотр логов выбранного пода
      8. minikube stop                               -- остановка minikube
***
