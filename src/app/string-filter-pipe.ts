import { Pipe, PipeTransform } from "@angular/core";

/**
 * A simple string filter, since ng2 does not yet have a filter pipe built in.
 */
// @Pipe({
//     name: 'stringFilter'
// })
// export class StringFilterPipe {

//     transform(value: string[], q: string) {
//         if (!q || q === '') {
//             return value;
//         }
//         return value.filter(item => -1 < item.toLowerCase().indexOf(q.toLowerCase()));
//     }
// }


@Pipe({
    name: 'stringFilter'
})
export class StringFilterPipe implements PipeTransform {
    transform(items: any[], args: any): any[] {
        var isSearch = (data: any): boolean => {
            var isAll = false;
            if (typeof data === 'object') {
                for (var z in data) {
                    if (isAll = isSearch(data[z])) {
                        break;
                    }
                }
            } else {
                if (typeof args === 'number') {
                    isAll = data === args;
                } else {
                    isAll = data.toString().match(new RegExp(args, 'i'));
                }
            }

            return isAll;
        };

        return items.filter(isSearch);
    }
}