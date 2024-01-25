import axios from "axios";
import API from ".";

interface IProps {
  url: string;
  method: string;
  data?: any;
  token?: any;
}

const REQUEST_API = async ({ url, method, data, token }: IProps) => {
  //   const Token = await AsyncStorage.getItem(ASYN.token);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMDMuMjI2LjI0OS4zMDo4MDAxXC9hcGlcL2xvZ2luLXphbG8tbWluaWFwcCIsImlhdCI6MTY4OTU2NDEwMCwiZXhwIjoxNjkwODYwMTAwLCJuYmYiOjE2ODk1NjQxMDAsImp0aSI6IlliTGJ5VDF1eTRLT0VuQ2kiLCJzdWIiOjMxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.71FVJWJ81jrtsFEE4oH61dC6fysluCnCBmirUDf00_U`,
  };

  const config = { method, url, data, headers };
  try {
    const res = await axios(config);
    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    if (String(e).indexOf("Network Error") !== -1) {
      throw new Error("Không có internet");
    } else {
      throw new Error();
    }
  }
};


export { REQUEST_API };
