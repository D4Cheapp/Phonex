import { camelToSnake } from './camel-to-snake';
import { snakeToCamel } from './snake-to-camel';

export enum ApiMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Props = {
  method: ApiMethods;
  url: string;
  body?: unknown;
};

export const request = async <T>({ method, url, body }: Props): Promise<T | null> => {
  const cookies = await getCookies();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const data = await fetch(`${apiUrl}${url}`, {
    method,
    body: body ? JSON.stringify(camelToSnake(body)) : undefined,
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookies ? `access_token=${cookies}` : '',
    },
    credentials: 'include',
  })
    .then(response => {
      if (!response.ok) {
        throw null;
      }
      return response;
    })
    .then(data => data.json())
    .then(snakeToCamel)
    .then(data => data as T)
    .catch(error => {
      console.error('Error fetching data:', error);
      return null;
    });

  return data;
};

const getCookies = async () => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    const { cookies } = await import('next/headers');

    return (await cookies()).get('access_token')?.value;
  } else {
    return document.cookie;
  }
};
