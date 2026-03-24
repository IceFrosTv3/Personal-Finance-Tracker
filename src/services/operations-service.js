import { HttpUtils } from "../utils/http-utils";
import { ToastUtils } from "../utils/toast-utils";

export class OperationsService {
    static async getTodayOperations () {
        const result = await HttpUtils.request(`/operations`, 'GET', true);
        if ( ToastUtils.checkAndShowError(result) ) return null;
        return result.response;
    }

    static async getOperationsWithFilter (dateFrom, dateTo) {
        const from = dateFrom.toISOString().split('T')[0];
        const to = dateTo.toISOString().split('T')[0];
        const result = await HttpUtils.request(`/operations?period=interval&dateFrom=${from}&dateTo=${to}`, 'GET', true);
        if ( ToastUtils.checkAndShowError(result) ) return null;
        return result.response
    }

    static async getAllOperations() {
        const result = await HttpUtils.request('/operations?period=all', 'GET', true);
        if (ToastUtils.checkAndShowError(result)) return null;
        return result.response;
    }

    static async getOperationByName (operationId) {
        const result = await HttpUtils.request(`/operations/${operationId}`, 'GET', true);
        if ( ToastUtils.checkAndShowError(result) ) return null;
        return result.response;
    }

    static async createOperation (data) {
        const result = await HttpUtils.request(`/operations`, 'POST', true, data);
        if ( ToastUtils.checkAndShowError(result) ) return null;
        return result.response;
    }

    static async updateOperation (operationId, data) {
        const result = await HttpUtils.request(`/operations/${operationId}`, 'PUT', true, data);
        if ( ToastUtils.checkAndShowError(result) ) return null;
        return result.response;
    }

    static async deleteOperation (operationId) {
        const result = await HttpUtils.request(`/operations/${operationId}`, 'DELETE', true);
        if ( ToastUtils.checkAndShowError(result) ) return null;
        return result.response;
    }
}
