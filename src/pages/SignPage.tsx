import * as React from 'react';
import { FormItem } from '../components/FormItem';
import { Btn, EBtnType } from '../components/Btn';
import { EInputType } from '../components/Input';
import { pageStyle } from '../styles';
import { observer } from 'mobx-react';
import { ISignArgs, IDeps } from '../types';
import { styleConsts } from '../styleContsts';

const signPageStyle = {
    ...pageStyle,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '800px',
    minWidth: styleConsts.minWidth,
    margin: 'auto',
}

// TODO: move to form?
const btnWrapperStyle = {
    textAlign: 'center',
    margin: '1rem 0',
};

interface ISignPageProps {
    deps: IDeps;
}

interface ISignState {
    login: string;
    pas: string;
}

@observer
export class SignPage extends React.Component<ISignPageProps, ISignState> {
    constructor (props: ISignPageProps) {
        super(props);
        this.state = {
            login: '',
            pas: '',
        };
    }

    changeLogin = (login: string) => {
        this.setState({ login });
    }

    changePassword = (pas: string) => {
        this.setState({ pas });
    }

    sign = (action: (args: ISignArgs) => Promise<void>) => {
        // in case there will be more props in the state
        const { login, pas, } = this.state;
        action({ login, pas, });
    }

    signIn = () => {
        const {
            deps: {
                userActions,
            },
        } = this.props;
        this.sign(userActions.signIn);
    }

    signUp = () => {
        const {
            deps: {
                userActions,
            },
        } = this.props;
        this.sign(userActions.signUp);
    }

    render() {
        const {
            deps: {
                userStore,
            },
        } = this.props;
        const { login, pas } = this.state;
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
