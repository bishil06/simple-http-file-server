# simple-http-file-server
simple http file server  

## 파일전송흐름

#### Client  
압축 -> 전송  

#### Server  
압축해제 -> 저장  


## Server

```shell
node index.mjs [destPath]
```

서버가 실행되면 받은 파일을 저장할 received_files 을 생성하고 요청을 기다립니다

## Client

```shell
node index.mjs <fileName or DirectoryName> <serverAddress>
```

클라이언트가 실행되면 서버로 파일을 업로드 합니다