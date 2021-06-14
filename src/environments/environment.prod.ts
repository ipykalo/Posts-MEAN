export const environment = {
    production: true,
    baseUrl: 'http://posts-env.eba-zwk4sjex.eu-west-1.elasticbeanstalk.com'
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
