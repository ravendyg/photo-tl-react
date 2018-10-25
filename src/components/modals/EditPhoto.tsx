import * as React from 'react';
import {observer} from 'mobx-react';
import {ModalWrapper} from './ModalWrapper';
import {FormItem} from '../FormItem';
import {EInputType} from '../Input';
import {EBtnType} from '../Btn';
import {ModalHeader} from './ModalHeader';
import {IFooterActionType, ModalFooter} from './ModalFooter';
import {IDeps} from '../../types';
import {ImageLoader} from '../ImageLoader';

const modalBodyStyle = {
    padding: '0 0.5rem',
    minWidth: '400px',
};

interface IEditPhotoModalProps {
    deps: IDeps;
}

interface IEditPhotoModalState {
    description: string;
    file: File | null;
    title: string;
}

@observer
export class EditPhotoModal extends React.Component<IEditPhotoModalProps, IEditPhotoModalState> {
    constructor(props: IEditPhotoModalProps) {
        super(props);
        // TODO: handle edit itself
        this.state = {
            description: '',
            file: null,
            title: '',
        };
    }

    handleChangeDescription = (description: string) => {
        this.setState({ description });
    }

    handleChangeTitle = (title: string) => {
        this.setState({ title });
    }

    handleFileChange = (file: File) => {
        this.setState({ file });
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
        const {
            description,
            file,
            title,
        } = this.state;
        const {
            deps: {
                photoStore: {
                    editedPhoto,
                },
            }
        } = this.props;
        const blockSave = !description || !file || !title;
        const headerText = (editedPhoto ? 'Edit ' : 'Add ') + 'Photo';
        const actions: IFooterActionType[] = [
            {
                action: this.handleCancel,
                disabled: false,
                label: 'Cancel',
                type: EBtnType.SECONDARY,
            }, {
                action: this.handleCancel,
                disabled: blockSave,
                label: 'Save',
                type: EBtnType.DEFAUL,
            },
        ];

        return (
            <ModalWrapper onOverlayClick={this.handleCancel}>
                <ModalHeader text={headerText}/>
                <div className="modal-body" style={modalBodyStyle}>
                    <FormItem
                        label='Login'
                        type={EInputType.TEXT}
                        value={title}
                        onChange={this.handleChangeTitle}
                        expand={true}
                    />
                    <FormItem
                        label='Descrition'
                        type={EInputType.TEXT}
                        value={description}
                        onChange={this.handleChangeDescription}
                        expand={true}
                    />
                    <ImageLoader
                        onChange={this.handleFileChange}
                        url=''
                    />
                </div>
                <ModalFooter actions={actions}/>
            </ModalWrapper>
        );
    }
}
