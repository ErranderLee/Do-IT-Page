interface Props {
  api: any;
  data?: any;
}
interface _Props {
  api: any;
  apiSrc: string;
  data?: any;
}

const URL = [
  "http://121.167.35.48:4000", // 01
  "http://218.209.6.69:4000", // 기윤이형집
  "http://localhost:4000",
  "http://192.168.0.42:4000", // 재명이집 호용이컴터
];
export const TARGET_URL = URL[2];

export const API = async ({ api, data }: Props) => {
  try {
    const { isSuccess, code, res, error } = await api(data);
    if (isSuccess) return res;
    throw new Error(error);
  } catch (err) {
    console.log(err, "서버 및 디비 에러");
  }
};

export const _API = async ({ api, apiSrc, data }: _Props) => {
  try {
    const { isSuccess, code, res, error } = await api(apiSrc, data);
    if (isSuccess) return res;
    throw new Error(error);
  } catch (err) {
    console.log(err, "서버 및 디비 에러");
  }
};
