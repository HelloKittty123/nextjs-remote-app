"use client";

export interface IFetch {
  api: string;
  method: "GET" | "PUT" | "POST" | "DELETE";
  payload?: any;
  headers?: any;
  retry?: number;
}

const fetchData = <T>({ api, method, payload, headers, retry = 0 }: IFetch): Promise<T> => {
  const getData = (retry: number) => {
    return new Promise<T>(async (resolve, reject) => {
      try {
        const response = await fetch(api, {
          method,
          body: JSON.stringify(payload),
          headers: headers || {
            "Content-Type": "application/json",
          },
        });
        const data = response.json();
        resolve(data);
      } catch (err) {
        console.log(err);
        if (retry > 0) {
          return getData(retry - 1);
        } else {
          reject(null);
        }
      }
    });
  };

  return getData(retry);
};

export default fetchData;
