const express = require('express');
const { loginControl, userControl, categoryControl, postControl } = require('./controllers');
const { validateLogin, validateNewUser,
  validateCategory, validatePost, auth } = require('./middlewares');
// ...

const app = express();

app.use(express.json());

app.get('/user', auth.authorizationVerify, userControl.getAllUsersCont);
app.get('/user/:id', auth.authorizationVerify, userControl.getUserByIdCont);
app.get('/categories', auth.authorizationVerify, categoryControl.getAllCategoriesControl);
app.get('/post', auth.authorizationVerify, postControl.getAllPostsControl);
app.get('/post/search', auth.authorizationVerify, postControl.searchPostControl);
app.get('/post/:id',
auth.authorizationVerify,
validatePost.validateIfExistPostId,
postControl.getPostWithUserAndCategoryControl);
app.post('/login', validateLogin, loginControl.login);
app.post('/user', validateNewUser.validateNewUserValues, userControl.createNewUser);
app.post('/categories',
auth.authorizationVerify,
validateCategory.validateCategoryValue,
categoryControl.createCategoryControl);
app.post('/post',
auth.authorizationVerify,
validatePost.validateCategories,
validatePost.validatePostValues,
postControl.createPostControl);
app.put('/post/:id',
auth.authorizationVerify,
validatePost.validateUpdatedPostValues,
postControl.updatePostControl);
app.delete('/post/:id', auth.authorizationVerify, postControl.deletePostControl);
app.delete('/user/me', auth.authorizationVerify, userControl.deleteUserControl);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
