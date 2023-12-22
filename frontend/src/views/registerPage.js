import React, { useState, useContext, useCallback } from "react"; // 리액트 및 필요한 모듈 가져오기
import AuthContext from "../context/AuthContext"; // 인증 컨텍스트 가져오기
import styles from "./registerPage.css";

function Register() {
  // 사용자 입력값을 상태 변수로 관리
  const [name, setName] = useState(""); // 사용자 이름 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const [password2, setPassword2] = useState(""); // 비밀번호 확인 상태
  const { registerUser } = useContext(AuthContext); // 사용자 등록 함수
  const [email, setEmail] = useState(""); // 이메일 상태
  const [dept, setDept] = useState("1"); // 부서 선택 상태 (기본값: 부서1)
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("")
  const [confirmPwdMsg, setConfirmPwdMsg] = useState("") //비번 확인
  const [idMsg, setIdMsg] = useState("") // 아이디 중복 메세지
  const [idIsCuplicate, setIdIsDuplicate] = useState(false) //아이디 중복인지(True,False)
  const [emailIsDuplicate, setEmailIsDuplicate] = useState(false); // 이메일 중복여부(True,False)

  // 비밀번호 및 이메일 관련 메시지를 나타내는 상태 변수
  const [pwdMsg, setPwdMsg] = useState(''); // 비밀번호 유효성 메시지
  const [emailMsg, setEmailMsg] = useState(""); // 이메일 유효성 메시지

  // warning 색
  const [idMsgColor, setIdMsgColor] = useState("red"); // 초기값을 빨강으로 설정
  const [emailMsgColor, setEmailMsgColor] = useState("red");


  //비밀번호 확인
  const onChangeConfirmPwd = useCallback((e) => {
    const currConfirmPwd = e.target.value;
    setPassword2(currConfirmPwd);

    if (currConfirmPwd !== password) {
      setConfirmPwdMsg("비밀번호가 일치하지 않습니다.")
    } else {
      setConfirmPwdMsg("올바른 비밀번호입니다.")
    }
  }, [password])

  // 비밀번호 변경 핸들러
  const onChangePwd = useCallback((e) => {
    // 입력한 비밀번호 값을 가져옵니다.
    const currPwd = e.target.value;

    // 상태 변수 password를 업데이트하여 현재 비밀번호와 동기화합니다.
    setPassword(currPwd);

    // 입력된 비밀번호의 유효성을 검사하고, 메시지를 설정합니다.
    if (!validatePwd(currPwd)) {
      setPwdMsg("영문, 숫자, 특수기호 조합으로 8자리 이상 입력해주세요.");
    } else {
      setPwdMsg("안전한 비밀번호입니다.");
    }
  }, []);

  // 이메일 변경 핸들러
  const onChangeEmail = useCallback(async (e) => {
    // 입력한 이메일 값을 가져옵니다.
    const currEmail = e.target.value;

    // 상태 변수 email을 업데이트하여 현재 이메일과 동기화합니다.
    setEmail(currEmail);

    // 입력된 이메일의 유효성을 검사하고, 메시지를 설정합니다.
    if (!validateEmail(currEmail)) {
      setEmailMsg("이메일 형식이 올바르지 않습니다.");
      setEmailMsgColor("red")
    } else {
      setEmailMsg("올바른 이메일 형식입니다.");
      setEmailMsgColor('green')
    }
  }, []);

  // 비밀번호 유효성 검사 함수
  const validatePwd = (password) => {
    return password
      .toLowerCase()
      .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/);
  };

  // 이메일 유효성 검사 함수
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}(?:\.[A-Za-z]{2,})?$/);
  };

  // 아이디 중복체크
  const checkDuplicateId = useCallback(async () => {
    try {
      // 백엔드 API 호출하여 아이디 중복 여부 확인
      const response = await fetch(`http://127.0.0.1:8000/api/checkId/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id
        })
      });
      const data = await response.json();

      if (response.ok) {
        if (data.isDuplicate) {
          setIdMsg("이미 사용 중인 아이디입니다.");
          setIdMsgColor("red")
        } else {
          setIdMsg("사용 가능한 아이디입니다.");
          setIdIsDuplicate(true);
          setIdMsgColor("green");
        }
      } else {
        console.error("Failed to check duplicate id.");
      }
    } catch (error) {
      console.error("Error occurred while checking duplicate id:", error);
    }
  }, [id]);

  // 이메일 중복체크
  const checkDuplicateEmail = useCallback(async () => {
    try {
      // 백엔드 API 호출하여 이메일 중복 여부 확인
      const response = await fetch(`http://127.0.0.1:8000/api/checkEmail/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email
        })
      });
      const data = await response.json();

      if (response.ok) {
        if (data.isDuplicate) {
          setEmailMsg("이미 사용 중인 이메일입니다.");
          setEmailMsgColor("red")
        } else {
          setEmailMsg("사용 가능한 이메일입니다.");
          setEmailIsDuplicate(true);
          setEmailMsgColor("green");
        }
      } else {
        console.error("Failed to check duplicate id.");
      }
    } catch (error) {
      console.error("Error occurred while checking duplicate id:", error);
    }
  }, [email]);

  // 검사 함수로 정리
  const isEmailValid = validateEmail(email);
  const isPwdValid = validatePwd(password);
  const isConfirmPwd = password === password2;
  // const isDuId = checkDuplicateId(id);
  // const isDuEmail = checkDuplicateEmail(email);

  // 검사를 묶기
  const isAllValid = isEmailValid && isPwdValid && isConfirmPwd;

  // 회원가입 양식 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 회원가입 함수 호출
    registerUser(name, password, password2, email, dept, phone, id);
  };


  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <hr />
        <div>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
        </div>
        <div>
          <label htmlFor="id">아이디</label>
          <input
            type="text"
            id="id"
            onChange={(e) => setId(e.target.value)}
            placeholder="Id"
            required
            disabled={idIsCuplicate}
          />
          <button type="button" onClick={checkDuplicateId}>중복 확인</button>
          <p style={{ color: idMsgColor }}>{idMsg}</p>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={onChangePwd}
            placeholder="Password"
            required
          />
          <p style={{ color: validatePwd(password) ? 'green' : 'red' }}>{pwdMsg}</p> {/* 비밀번호 유효성 메시지 */}
        </div>
        <div>
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            onChange={onChangeConfirmPwd}
            placeholder="Confirm Password"
            required
          />
          <p style={{ color: password2 === password ? 'green' : 'red' }}>{confirmPwdMsg}</p> {/* 비밀번호 일치 여부 메시지 */}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            onChange={onChangeEmail}
            placeholder="Email"
            disabled={emailIsDuplicate}
            required
          />
          <button type="button" onClick={checkDuplicateEmail}>중복 확인</button>
          <p style={{ color: emailMsgColor }}>{emailMsg}</p>
        </div>
        <div>
          <label htmlFor="phone">폰 번호</label>
          <input
            type="text"
            id="phone"
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            required
          />
        </div>
        <div>
          <label htmlFor="dept">Dept</label>
          <select name="dept" id="dept" onChange={(e) => setDept(e.target.value)} value={dept}>
            <option value="1">부서1</option>
            <option value="2">부서2</option>
            <option value="3">부서3</option>
          </select>
        </div>
        <button type="submit" disabled={!isAllValid}>회원가입</button>
      </form>
    </section>
  );
}

export default Register;
