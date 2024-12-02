# VK-cloud
***
## Description
* ### lab 1
   Серверная часть приложения (Spring Boot)
* ### lab 2
   Клиентская часть приложения (React)
***
## API

* ### ***GET*** [~/s3/files]()
  #### Получение списка всех файлов из s3
    
  #### *Typescript*
  ```TypeScript
  const getFilesRequest = useCallback(
    () =>
      getFiles().then((response) => {
        const { data } = response;

        const updatedFiles: FileModel[] = data.map((fileName) => ({
          fileName,
          id: uuidv4(),
        }));

        setFiles(updatedFiles);
      }),
    []
  );
  ```
  #### *Java*
  ```java
    @GetMapping()
    public ResponseEntity<List<String>> getListFiles() {
        return ResponseEntity.ok(this.bucketService.getListFiles());
    }
  ```
* ### ***GET*** [~/s3/files/{fileName}]()
  #### Скачивание конкретного файла из s3, по его полному имени
    
  #### *Typescript*
  ```TypeScript
  const hrefToDownload = getDownloadUrl(fileName);

  return (
     <Form.Item key={id}>
        <Anchor.Link
           title={fileName}
           href={hrefToDownload}
           className={s["second-container__file-name"]}
        />
     </Form.Item>
  );
  ```
  #### *Java*
  ```java
    @GetMapping("/{fileName}")
    public ResponseEntity<Resource> getFile(@PathVariable("fileName") String fileName) throws IOException {
        var byteArray = this.bucketService.getFile(fileName);

        var headers = new HttpHeaders();
        headers.add(
                HttpHeaders.CONTENT_DISPOSITION,
                String.format("attachment; filename=\"%s\"", fileName)
        );

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(byteArray.contentLength())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(byteArray);
    }
  ```
* ### ***POST*** [~/s3/files/{fileName}]()
  #### Добавление нового файла в s3, по его полному имени
  
  #### *Typescript*
  ```TypeScript
  const uploadImageToS3 = async (file: RcFile): Promise<string> => {
    await uploadFile(file).then(getFilesRequest);

    return "";
  };
  ```
  #### *Java*
  ```java
    @PostMapping("/upload")
    public ResponseEntity<Void> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        this.bucketService.uploadFile(file);

        return ResponseEntity.accepted().build();
    }
  ```
* ### ***DELETE*** [~/s3/files/{fileName}]()
  #### Удаление конкретного файла из s3, по его полному имени
    
  #### *Typescript*
  ```TypeScript
  const onDeleteClickHandler = () => {
    const choosenFile = files.find(({ id }) => id === choosenValue);

    if (!choosenFile) {
      return;
    }

    deleteFile(choosenFile.fileName).then(getFilesRequest);
  };
  ```
  #### *Java*
  ```java
    @DeleteMapping("/{fileName}")
    public ResponseEntity<Void> deleteFile(@PathVariable("fileName") String fileName) {
        this.bucketService.deleteFile(fileName);

        return ResponseEntity.accepted().build();
    }
  ```
* ### ***GET*** [~/cv/detect/{fileName}]()
   #### Получение изображения из s3, отправка его в CV для определения изображённых объектов, рисование прямоугольника поверх изображения с помощью Graphics2D и добавлениеего в s3 с потсфиксом наименования обнаруженного объекта.
    
  #### *Typescript*
  ```TypeScript
  const onDetermineClickHandler = () => {
    const choosenFile = files.find(({ id }) => id === choosenValue);

    if (!choosenFile) {
      return;
    }

    detectFile(choosenFile.fileName).then(getFilesRequest);
  };
  ```
  #### *Java*
  ```java
    @GetMapping("/{fileName}")
    public ResponseEntity<Void> detectOnImage(@PathVariable("fileName") String fileName) throws IOException {
        var file = this.bucketService.getFile(fileName);
        var extension = fileName.split("\\.")[1];
        var label = this.detectOnImage(file);
        var result = this.drawDetect(file, label.coordination(), extension);
        this.bucketService.uploadFile(result, this.imageName(label, extension));

        return ResponseEntity.accepted().build();
    }
  ```
***
## Kubernetes

### Files for deploy
* #### service.yaml
```yaml
apiVersion: v1
kind: Service
metadata:
  name: test

spec:
  type: LoadBalancer
  selector:
    app: test
  ports:
    - protocol: TCP
      name: http-traffic
      port: 8080
      targetPort: 8080
``` 
* #### deployment.yaml
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: test

spec:
  replicas: 1
  selector:
    matchLabels:
      app: test
  template:
    metadata:
      labels:
        app: test
    spec:
      containers:
        - name: test
          image: kichnotna/test
          ports:
            - containerPort: 8080

```
* #### Dockerfile
```Dockerfile
FROM openjdk:21-jdk

ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
```

### Main commands
* #### *запуск minikube*
```cmd
minikube start 
```
* #### *применение deployment*
```cmd
kubectl apply -f deployment.yaml
```
* #### *применение service*
```cmd
kubectl apply -f service.yaml 
```
* #### *получения списка всех ресурсов*
```cmd
kubectl get all   
```
* #### *запуск графического интерфейса для minikube*
```cmd
minikube dashboard 
```
* #### *запуск tunnel для локальных запросов*
```cmd
minikube tunnel  
```
* #### *просмотр логов выбранного пода*
```cmd
kubectl logs <pod-name>
```
* #### *остановка minikube*
```cmd
minikube stop 
```
***
