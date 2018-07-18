
export const menuItems = [
    {
        key: 1,
        text: `User data`,
        disp: -1,
        click: () => {
            this._closeUserMenu();
            location.hash = `/loggedin/user-data`;
        }
    },{
        key: 2,
        text: `All photos`,
        disp: 1,
        click: () => {
            this._closeUserMenu();
            location.hash = `/loggedin/all-photos`;
        }
    },{
        key: 3,
        text: `My photos`,
        disp: 1,
        click: () => {
            this._closeUserMenu();
            location.hash = `/loggedin/my-photos`;
        }
    },{
        key: 4,
        text: `SignOut`,
        disp: 0,
        click: () => {
            this._closeUserMenu();
            this._signout();
        }
    }
];
