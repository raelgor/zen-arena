/* global app, api, routes, pageHandlers */
'use strict';

// Debug
if(DEBUG_MODE)
   app.router.use(routes.logger.route);

app.router.param('lang_code', require('./validators/param.lang_code'));

// Api route
app.router.post('/api/text/:lang_code', api.text.route);

app.router.all('/api*', routes.langCookieGetter.route);
app.router.post('/api/login', api.login.route);
app.router.post('/api/goauth', api.goauth.route);
app.router.post('/api/fblogin', api.fblogin.route);
app.router.post('/api/register', api.register.route);
app.router.post('/api/updategeo', api.updategeo.route);
app.router.post('/api/forgotpass', api.forgotpass.route);
app.router.post('/api/recoverpass', api.recoverpass.route);
app.router.post('/api/resubscribe/:token', api.resubscribe.route);

// Calls that require authentication
app.router.post('/api/logout', api.logout.route);
app.router.post('/api/like/:action/:type/:id', api.like.route);
app.router.post('/api/comment/create/:post_id', api.commentcreate.route);
app.router.post('/api/comment/getprevious/:post_id/:earliest_index', api.commentgetprev.route);
app.router.post('/api/comment/delete/:comment_id', api.commentdelete.route);

app.router.post('/api/post/delete/:post_id', api.postdelete.route);
app.router.post('/api/post/create', api.postcreate.route);

app.router.post('/api/feed/news/range/:index', api.feedrange.route);

app.router.post('/api/selector/language/:index', api.selector.route);

app.router.post('/api/set/language/:lang_code', api.set.route);

// View html factories
app.router.post('/api/view/index', api.viewindex.route);
app.router.post('/api/view/post/:post_id', api.viewpost.route);
app.router.post('/api/view/rightcol', api.viewrightcol.route);

// Page routes
app.router.all(['/','/home'], pageHandlers.home.route);
app.router.all('/post/:post_id', pageHandlers.post.route);
app.router.all('/verifyemail/:token', pageHandlers.verifyemail.route);
app.router.all('/unsubscribeall/:token', pageHandlers.unsubscribeall.route);

// @todo Make these routes

// Main game page
app.router.all('/:game', () => {});

// Leaderboards
app.router.all('/:game/leaderboard/top-players', () => {});
app.router.all('/:game/leaderboard/top-teams', () => {});

// Tournaments using default geoip
app.router.all('/:game/tournaments', () => {});
app.router.all('/:game/tournaments/:country_code/:city', () => {});

// Team page
app.router.all('/teams/:id_or_namespace', () => {});

// Place page
app.router.all('/places/:id_or_namespace', () => {});
app.router.all('/places/:id_or_namespace/tournaments', () => {});

// Tournament page
app.router.all('/tournaments/:id_or_alias', () => {});
app.router.all('/tournaments/:id_or_alias/teams', () => {});
app.router.all('/tournaments/:id_or_alias/info', () => {});
app.router.all('/tournaments/:id_or_alias/feats', () => {});
app.router.all('/tournaments/:id_or_alias/prizes', () => {});
app.router.all('/tournaments/:id_or_alias/progress', () => {});
app.router.all('/tournaments/:id_or_alias/leaderboard', () => {});
app.router.all('/tournaments/:id_or_alias/settings', () => {});

// Static
app.router.all('/settings', () => {});
app.router.all('/settings/sessions', () => {});
app.router.all('/settings/merge', () => {});

app.router.all('/terms-of-service', () => {});
app.router.all('/privacy-policy', () => {});
app.router.all('/about', () => {});
app.router.all('/contact', () => {});

// Site announcements
app.router.all('/news', () => {});

// List of supported games
app.router.all('/games', () => {});

// Player page
app.router.all('/:player_id_or_namespace', () => {});
app.router.all('/:player_id_or_namespace/achievements', () => {});
app.router.all('/:player_id_or_namespace/teams', () => {});
