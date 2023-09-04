# 참고

https://medium.com/@yujso66/%EB%B2%88%EC%97%AD-node-js%EC%97%90%EC%84%9C-grpc-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-4521604d8852

# Vercel에 publish 하기



# server에서 proto 노출시키기

https://stackoverflow.com/questions/57110244/can-the-proto-file-be-generated-from-the-server-by-any-client

https://github.com/grpc/grpc/blob/master/doc/server-reflection.md

https://grpc.github.io/grpc/cpp/md_doc_server_reflection_tutorial.html

## gRPC를 쓰는 이유

ref: https://okky.kr/questions/1399357

monolith 방식에 백엔드 서버가 단일 서버거나, 백엔드 서버끼리 통신속도가 빠른거에 목숨걸 필요 없으면 기존에 REST방식 쓰는데,

MSA처럼 백엔드 서버를 여러개로 자잘하게 쪼개놔서 백엔드 서버끼리 통신속도가 빠른게 중요하면, RPC를 쓰는걸로 알고있습니다.

기존 REST방식은 java던 C#이던 Go던 통신할 때 json 형식으로 변환해서 통신하는데,

RPC는 protoBuffer라는 형식으로 통신하고, 프로토 버퍼가 바이너리 파일 구조와 network optimization을 해놔서 json으로 통신할 때 대비 5배정도 더 빠르다고 하더라구요.

또한 RPC는 http2.0 으로 통신하는데, http 2.0은 http1.1과는 다르게 요청을 한번에 배치로 묶어서 보내기 때문에 통신속도가 더 빠르다고 알고있습니다.

멀티플렉싱 기술이라고 하나요?

http header압축시키는 기술도 http 2.0에 있다고 알고있구요.

이 외에도 protoBuffer의 스키마를 정의할 때, 주고받는 데이터의 타입도 정의하니까 REST와는 다르게 type safety도 챙겨갈 수 있고, typescript쪽에서 쓰는 tRPC의 경우는 프론트랑 백이 한 프로젝트에서 연결되있는 상태에서 프론트의 tRPC call의 메서드 이름만 틀려도 바로 에러가 뜨더라구요. 런타임 때 에러 나는게 아니라 컴파일 타임 때 에러나서 개발할 때 용이하다고 들었습니다.

이런 여러가지 이점 때문에 RPC 기술이 각광받고는 있지만, 아직 모든 브라우저가 최소 http2.0 이상을 지원하지는 않기 때문에 클라이언트 단까지는 http 1.0, http 1.1을 지원하는 REST를 쓰고, 클라이언트랑 통신하는 백엔드 단에는 더 빠른 RPC를 쓴다고 알고있습니다.

그리고 RPC는 API의 한 종류이기 때문에 db접근과는 무관하다고 알고있습니다.

db 접근은 jdbc, hibernate같은 애들이 해주는 거겠죠..?
