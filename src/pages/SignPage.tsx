import * as React from 'react';
import {FormItem} from '../components/FormItem';
import {Btn, EBtnType} from '../components/Btn';
import {EInputType} from '../components/Input';
import {pageStyle} from '../styles';
import {IAppStore} from '../store/store';
import {observer} from 'mobx-react';

const signPageStyle = {
    ...pageStyle,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
}

// TODO: move to form?
const btnWrapperStyle = {
    textAlign: 'center',
    margin: '1rem 0',
};

interface ISignPageProps {
    store: IAppStore;
}

interface ISignState {
    login: string;
    pas: string;
}

@observer
export class SignPage extends React.Component<ISignPageProps, ISignState> {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            pas: '',
        };
    }

    changeLogin = (login) => {
        this.setState({login});
    }

    changePassword = (pas) => {
        this.setState({pas});
    }

    signIn = () => {
        const {store: {userStore}} = this.props;
        const {login, pas} = this.state;
        userStore.signIn({
            login,
            pas,
        })
    }

    signUp = () => {

    }

    render() {
        const {store: {userStore}} = this.props;
        const {login, pas} = this.state;
        const disabled = login.length < 2 || pas.length < 2;
        const error = userStore.error;

        return (
            <div style={signPageStyle}>
                <div>
                    <FormItem
                        label='Login'
                        type={EInputType.TEXT}
                        value={login}
                        onChange={this.changeLogin}
                    />
                    <FormItem
                        label='Password'
                        type={EInputType.PASSWORD}
                        value={pas}
                        onChange={this.changePassword}
                    />
                    {error && <div>{error}</div>}
                    <div style={btnWrapperStyle}>
                        <Btn
                            disabled={disabled}
                            label='Sign In'
                            action={this.signIn}
                        />
                    </div>
                    <div style={btnWrapperStyle}>
                        <Btn
                            disabled={disabled}
                            type={EBtnType.SECONDARY}
                            label='Sign Up  '
                            action={this.signUp}
                        />
                    </div>
                </div>
            </div>
        )
    }
}