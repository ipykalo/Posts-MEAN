exports.MIME_TYPE_MAP = {
    'image/png' : 'png',
    'image/jpeg': 'jpg',
    'image/jpg' : 'jpg'
};

exports.TOKEN_EXPIRE_TIME = 1200 //20 minutes;

exports.TOKEN_SECRET_KEY = 'secret_private_key';

exports.MESSAGES = {
    CREATE_POST_SUCCESS: 'Post created successfully!',
    CREATE_POST_FAILURE: 'Creating a post failed!',
    FETCH_POSTS_SUCCESS: 'Posts fetched successfully!',
    FETCH_POSTS_FAILURE: 'Fetching posts failed!',
    FETCH_POST_FAILURE:  'Fetching the post failed!',
    DELTE_POST_AUTH:     'Only the creator can delete the Post!',
    DELTE_POST_SUCCESS:  'Post deleted successfully!',
    DELTE_POST_FAILURE:  'Deleting the post failed!',
    UPDATE_POST_AUTH:    'Only the creator can modify the Post!',
    UPDATE_POST_SUCCESS: 'Post updated successfully!',
    UPDATE_POST_FAILURE: 'Updating the post failed!',
    USER_CREATE_SUCCESS: 'User created successfully!',
    USER_CREATE_FAILURE: 'Creating the user is failed!',
    LOGIN_AUTH:          'Unauthorised',
    LOGIN_SUCCESS:       'Login successfully!',
    LOGIN_FAILURE:       'Login is failed!'
}