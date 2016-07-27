export default function make_default_meta_data(core_text: any) {
   return {
      title: core_text.title,
      og_image: '/img/og.jpg',
      og_description: core_text.og_description,
      og_site_name: appConfig.site_name,
      og_locale: appConfig.og_locale
   };
};
