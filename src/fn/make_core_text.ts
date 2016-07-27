export default function make_core_text(lang: string) {
   var result = {};
   for(let key in text.core[lang])
      result[key] = text.core[lang][key].text;
   return result;
}
