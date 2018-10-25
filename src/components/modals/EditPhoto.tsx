import * as React from 'react';
import {observer} from 'mobx-react';
import {ModalWrapper} from './ModalWrapper';
import {FormItem} from '../FormItem';
import {EInputType} from '../Input';
import {EBtnType} from '../Btn';
import {ModalHeader} from './ModalHeader';
import {IFooterActionType, ModalFooter} from './ModalFooter';
import {IDeps} from '../../types';

interface IEditPhotoModalProps {
    deps: IDeps;
}

interface IEditPhotoModalState {
    description: string;
    title: string;
}

@observer
export class EditPhotoModal extends React.Component<IEditPhotoModalProps, IEditPhotoModalState> {
    constructor(props: IEditPhotoModalProps) {
        super(props);
        // TODO: handle edit itself
        this.state = {
            description: '',
            title: '',
        };
    }

    handleChangeDescription = (description: string) => {
        this.setState({ description });
    }

    handleChangeTitle = (title: string) => {
        this.setState({ title });
    }

    handleCancel = () => {
        const {
            deps: {
                photoActions,
            },
        } = this.props;
        photoActions.stopEditPhoto();
    }

    handleSave = () => {
        console.log('save');
    }

    render() {
        const {description, title} = this.state;
        const {
            deps: {
                photoStore: {
                    editedPhoto,
                },
            }
        } = this.props;
        const headerText = (editedPhoto ? 'Edit ' : 'Add ') + 'Photo';
        const actions: IFooterActionType[] = [
            {
                action: this.handleCancel,
                label: 'Cancel',
                type: EBtnType.SECONDARY,
            }, {
                action: this.handleCancel,
                label: 'Save',
                type: EBtnType.DEFAUL,
            },
        ];

        return (
            <ModalWrapper onOverlayClick={this.handleCancel}>
                <ModalHeader text={headerText}/>
                <div className="modal-body">
                    <FormItem
                        label='Login'
                        type={EInputType.TEXT}
                        value={title}
                        onChange={this.handleChangeTitle}
                    />
                    <FormItem
                        label='Descrition'
                        type={EInputType.TEXT}
                        value={description}
                        onChange={this.handleChangeDescription}
                    />
                </div>
                <ModalFooter actions={actions}/>
            </ModalWrapper>
        );
    }
}
