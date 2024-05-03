import { httpGet } from "./mock-http-interface";

type TResult = { "Arnie Quote"?: string; FAILURE?: string };

const fetchListOfUrls = async (urls: string[]) => {
  return urls?.map(async (url) => {
    const response = await httpGet(url);
    const { body, status } = response;
    const parseBody = JSON.parse(body);
    if (status === 200) {
      return { "Arnie Quote": parseBody.message };
    } else {
      return { FAILURE: parseBody.message };
    }
  });
};

export const getArnieQuotes = async (urls: string[]): Promise<TResult[]> => {
  return (await Promise.all(await fetchListOfUrls(urls))) ?? [];
};
