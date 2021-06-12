import { environment } from "src/environments/environment";

export class Helper {
    static url(urlTemplate: string, ...params: Array<string | number>): string {
        return `${environment.baseUrl}${this.format(urlTemplate, ...params)}`;
    }

    private static format(urlTemplate: string, ...params: Array<string | number>): string {
        for (let i = 0, len = params?.length; i < len; i++) {
            urlTemplate = urlTemplate?.split(`{${i}}`).join(params[i]?.toString());
        }
        return urlTemplate;
    }
}