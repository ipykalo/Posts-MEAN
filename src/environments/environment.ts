// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    baseUrl: 'http://localhost:3000'
};

export const URLS = {
    LOGIN: '/api/user/login',
    SIGNUP: '/api/user/signup',
    FETCH_POSTS: '/api/posts?pageSize={0}&page={1}',
    FETCH_POST: '/api/posts/{0}',
    UPDATE_POST: '/api/posts/{0}',
    DELETE_POST: '/api/posts/{0}',
    CREATE_POST: '/api/posts'
}