var http = require('http');
var cookie = require('cookie');

//세션 관리,개인화, tracking

http.createServer(function (req, res) {
    /* 쿠키 생성 */

    res.writeHead(200, {
        'Set-Cookie': [
            'yummy_cookie=choco',
            'tasty_cookie=strawberry',
            `Permanet=cookies; Max-age= ${60 * 60}`,
            'Secure=Secure; Secure',
            'HttpOnly=HttpOnly; HttpOnly',
            'Path=Path; Path=/cookie'
        ]
    });

    /* 쿠키 읽기 */
    console.log(req.headers.cookie);
    var cookies = {}
    if (req.headers.cookie !== undefined) {
        cookies = cookie.parse(req.headers.cookie);
    }
    console.log(cookies.yummy_cookie);


    res.end('Cookie!!');
}).listen(3000);

/* 쿠키 유효기간
session VS Permanent 
session : 브라우저 종료시 삭제 -> 첫번째 방식 ex>'Set-Cookie': ['yummy_cookie=choco', 'tasty_cookie=strawberry']
Permanent : 브라우저 종료시에도 존재  ex> 'Set-Cookie': ['yummy_cookie=choco','tasty_cookie=strawberry',`Permanet=cookies; Max-age= ${60}` ]
*/

/* 보안
secure  : https로 통신할때만 쿠키값 전달 ex> 'Secure=Secure; Secure',
HttpOnly : javascript로는 접근불가 -> 웹서버와 브라우저 통신시에만 쿠키값을 알수있음 ex> 'HttpOnly=HttpOnly; HttpOnly'
*/

/* 
path  : 특정 디렉토리에서만 활성화되도록 ex> 'Path=Path; Path=/cookie'
domain : 어떠한 서브 도메인에서도 살아남는다. 'Domain=Domain; Domain=o2.org'
*/