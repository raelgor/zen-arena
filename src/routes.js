/* global app, api, routes, pageHandlers */
'use strict';

// Api route
app.router.post('/api/text/:lang', api.text.route);

app.router.all('/api*', [
   routes.cacheStaller.route,
   routes.langCookieGetter.route
]);

app.router.post('/api/login', api.login.route);
app.router.post('/api/goauth', api.goauth.route);
app.router.post('/api/fblogin', api.fblogin.route);
app.router.post('/api/register', api.register.route);
app.router.post('/api/forgotpass', api.forgotpass.route);
app.router.post('/api/recoverpass', api.recoverpass.route);
app.router.post('/api/resubscribe/:token', api.resubscribe.route);

// Calls that require authentication
app.router.post('/api/logout', api.logout.route);

// Page routes
app.router.all(['/','/home'], pageHandlers.home.route);
app.router.all('/unsubscribeall/:token', pageHandlers.unsubscribeall.route);
app.router.all('/verifyemail/:token', pageHandlers.verifyemail.route);
