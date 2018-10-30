import { ICommonStore } from '../store/commonStore';

export interface ICommonActions {

}

export class CommonActions implements ICommonActions {
    constructor (
        private commonStore: ICommonStore,
    ) { }


}
