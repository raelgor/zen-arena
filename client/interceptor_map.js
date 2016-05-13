za.interceptor_map = {
   '^/api/logout$': [
      za.logout,
      '/api/logout',
      'body > .content > .page-view'
   ],
   '^/$': [
      '/api/view/index',
      '.logged-in .page-view .left-column',
      'body > .content > .page-view'
   ],
   '^/settings$': [
      '/settings',
      '.logged-in .page-view .settings-container .settings-page',
      'body > .content > .page-view'
   ],
   '^/settings/([^/]*)$': [
      '/settings/$1',
      '.logged-in .page-view .settings-container .settings-page',
      'body > .content > .page-view'
   ],
   '^/([0-9]*)$': [
      '/api/view/namespace/$1',
      '.page-view .left-column',
      'body > .content > .page-view'
   ],
   '^/post/([0-9]*)$': [
      '/api/view/post/$1',
      '.page-view .left-column',
      'body > .content > .page-view'
   ]
};
