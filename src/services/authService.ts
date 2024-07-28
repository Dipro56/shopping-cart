import { getCookie } from 'typescript-cookie';

interface AuthService{
  login: (username: string, password: string) => Promise<any>;
}

const authService: AuthService = {
  login: async (username, password) => {
    try {
      let url = `${process.env.NEXT_PUBLIC_BASE_API}/auth/login`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 60,
        }),
      })
        .then((response) => response.json())
        .catch((error) => error.response);
      return response;
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  },
};

export default authService;
