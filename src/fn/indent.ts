export default function indent(req?: any, offset?: number, depthName?: string): string {

   let i = req && !isNaN(req._depth) ? (req._depth += offset) : 1;

   if(req && !isNaN(req._depth) && depthName) {
      req._depth_name = depthName;
   }

   let exp = '';

   if(i)
      while(i--)
         exp += ' ';

   return exp;

}
