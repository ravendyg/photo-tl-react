
export class MenuItems {
    public items: {
        key: number,
        text: string,
        disp: number,
        click: Function,
    }[]

    constructor(private _closeUserMenu: Function, private _signout: Function) {
        this.items = [{
            key: 1,
            text: `User data`,
            disp: -1,
            click: () => {
                _closeUserMenu();
                location.hash = `/loggedin/user-data`;
            }
        },{
            key: 2,
            text: `All photos`,
            disp: 1,
            click: () => {
                _closeUserMenu();
                location.hash = `/loggedin/all-photos`;
            }
        },{
            key: 3,
            text: `My photos`,
            disp: 1,
            click: () => {
                _closeUserMenu();
                location.hash = `/loggedin/my-photos`;
            }
        },{
            key: 4,
            text: `SignOut`,
            disp: 0,
            click: () => {
                _closeUserMenu();
                _signout();
            }
        }];
    }

}
