import * as passport from 'passport';

const a = instance.app.router;

// Debug
if(instance.flags.DEBUG_MODE)
   a.use(routes.logger.route);

a.use(passport.initialize());
a.use(passport.session());

// Add cors header if there is one
appConfig.cors_header &&
a.use(function(req, res, next){
   res.setHeader('access-control-allow-origin', appConfig.cors_header);
   next();
});

// Parameter validators
a.param('lang_code', require('./validators/param.lang_code'));
a.param('setting_category', require('./validators/param.setting_category'));
a.param('oauth_account_id_key', require('./validators/param.oauth_account_id_key'));
a.param('setting_category_group', require('./validators/param.setting_category_group'));

// Api route
a.post('/api/text/:lang_code', api.text.route);

a.all('/api*', routes.langCookieGetter.route);
a.post('/api/login', api.login.route);
a.post('/api/goauth', api.goauth.route);
a.post('/api/fblogin', api.fblogin.route);
a.post('/api/register', api.register.route);
a.post('/api/updategeo', api.updategeo.route);
a.post('/api/forgotpass', api.forgotpass.route);
a.post('/api/recoverpass', api.recoverpass.route);
a.post('/api/resubscribe/:token', api.resubscribe.route);

// Calls that require authentication
a.post('/api/logout', api.logout.route);
a.post('/api/like/:action/:type/:id', api.like.route);
a.post('/api/comment/create/:post_id', api.comment.create.route);
a.post('/api/comment/getprevious/:post_id/:earliest_index', api.comment.getprev.route);
a.post('/api/comment/delete/:comment_id', api.comment.delete.route);

a.post('/api/post/delete/:post_id', api.post.delete.route);
a.post('/api/post/create', api.post.create.route);

a.post('/api/feed/news/range/:index', api.feedrange.route);

a.post('/api/selector/language/:index', api.selector.route);

a.post('/api/set/language/:lang_code', api.set.route);

a.post('/api/settings/user/password', api.settings.user.password.route);

a.post('/api/oauth/unlink/:oauth_account_id_key', api.oauth.unlink.route);
a.post('/api/oauth/link/fb', api.oauth.link.fb.route);
a.post('/api/oauth/link/coc', api.oauth.link.coc.route);
a.post('/api/oauth/link/gplus', api.oauth.link.gplus.route);
a.all('/api/battlenet/regcb', api.oauth.link.battlenet.route);
a.all('/api/oauth/link/battlenet',
   routes.authentication.route,
   routes.authFilter.route,
   passport.authenticate('bnet'));

a.post('/api/admin/appcfg', api.admin.appcfg.route);

// View html factories
a.post('/api/view/index', api.view.index.route);
a.post('/api/view/post/:post_id', api.view.post.route);
a.post('/api/view/rightcol', api.view.rightcol.route);

// Page routes
a.all(['/','/home'], pageHandlers.home.route);
a.all('/post/:post_id', pageHandlers.post.route);
a.all([
   '/settings',
   '/settings/:setting_category',
   '/settings/:setting_category_group/:setting_category',
], pageHandlers.settings.route);
a.all('/verifyemail/:token', pageHandlers.verifyemail.route);
a.all('/unsubscribeall/:token', pageHandlers.unsubscribeall.route);

// @todo Make these routes

// Main game page
a.all('/:game', () => {});

// Leaderboards
a.all('/:game/leaderboard/top-players', () => {});
a.all('/:game/leaderboard/top-teams', () => {});

// Tournaments using default geoip
a.all('/:game/tournaments', () => {});
a.all('/:game/tournaments/:country_code/:city', () => {});

// Team page
a.all('/teams/:id_or_namespace', () => {});

// Place page
a.all('/places/:id_or_namespace', () => {});
a.all('/places/:id_or_namespace/tournaments', () => {});

// Tournament page
a.all('/tournaments/:id_or_alias', () => {});
a.all('/tournaments/:id_or_alias/teams', () => {});
a.all('/tournaments/:id_or_alias/info', () => {});
a.all('/tournaments/:id_or_alias/feats', () => {});
a.all('/tournaments/:id_or_alias/prizes', () => {});
a.all('/tournaments/:id_or_alias/progress', () => {});
a.all('/tournaments/:id_or_alias/leaderboard', () => {});
a.all('/tournaments/:id_or_alias/settings', () => {});

// Static
a.all('/settings', () => {});
a.all('/settings/sessions', () => {});
a.all('/settings/merge', () => {});

a.all('/terms-of-service', () => {});
a.all('/privacy-policy', () => {});
a.all('/about', () => {});
a.all('/contact', () => {});

// Site announcements
a.all('/news', () => {});

// List of supported games
a.all('/games', () => {});

// Player page
a.all('/:player_id_or_namespace', () => {});
a.all('/:player_id_or_namespace/achievements', () => {});
a.all('/:player_id_or_namespace/teams', () => {});
