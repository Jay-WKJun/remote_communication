import { Server, ServerCredentials, ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { AuthServiceService, LoginRequest, LoginResult, LoginCode } from './protos/auth';

const users = [{ id: 0, username: 'admin', password: 'qwerty' }];

const login = (
  // 요청이 정의된 곳, 클라이언트가 보낸 데이터를 가져올 수 있다.
  call: ServerUnaryCall<LoginRequest, LoginResult>,
  // login 원격함수의 response 정의 콜백, 첫번째는 에러 정의, 두번째는 실제 결과
  callback: sendUnaryData<LoginResult>
) => {
  const user = users.find(
    (user) =>
      user.username === call.request.username &&
      user.password === call.request.password
  );

  if (user) {
    const result: LoginResult = {
      loginCode: LoginCode.SUCCESS,
      token: 'RandomSecretToken',
    };
    callback(null, result);
  } else {
    const result: LoginResult = {
      loginCode: LoginCode.FAIL,
    };
    callback(null, result);
  }
};

// gRPC 서버 인스턴스를 만든다.
const server = new Server();
// gRPC 서버 인스턴스에 proto로 만들어진 ts로 쓰여진 interface를 추가한다.
// 노출할 login 함수에 해당하는 interface인 AuthServiceService에 추가한다.
server.addService(AuthServiceService, { login });
// 자격증명 정의, HTTPS 연결을 보호하는데 사용
server.bindAsync('localhost:8080', ServerCredentials.createInsecure(), () => {
  console.log('server started');
  server.start();
});
