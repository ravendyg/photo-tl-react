import * as React from 'react';
import {observer} from 'mobx-react';
import {ModalWrapper} from './ModalWrapper';
import {FormItem} from '../FormItem';
import {EInputType} from '../Input';
import {EBtnType, Btn} from '../Btn';
import {ModalHeader} from './ModalHeader';
import {IFooterActionType, ModalFooter} from './ModalFooter';
import {IDeps} from '../../types';
import {ImageLoader} from '../ImageLoader';

const modalBodyStyle = {
    padding: '0 1.5rem',
    minWidth: '400px',
};

const deleteWrapperStyle = {
    textAlign: 'center',
    marginBottom: '2rem',
}

interface IEditPhotoModalProps {
    deps: IDeps;
}

interface IEditPhotoModalState {
    description: string;
    error: string;
    file: File | null;
    title: string;
    uploading: boolean;
}

@observer
export class EditPhotoModal extends React.Component<IEditPhotoModalProps, IEditPhotoModalState> {
    constructor(props: IEditPhotoModalProps) {
        super(props);
        const {
            deps: {
                photoStore: {
                    editedPhoto,
                },
            }
        } = this.props;

        this.state = {
            description: editedPhoto && editedPhoto.description || '',
            error: '',
            file: null,
            title: editedPhoto && editedPhoto.title || '',
            uploading: false,
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
        const {
            deps: {
                photoActions,
            },
        } = this.props;
        const {
            description,
            file,
            title,
        } = this.state;
        if (description && file && title) {
            this.setState({ uploading: true });
            photoActions.uploadPhoto(title, description, file)
            .catch(err => {
                this.setState({
                    error: err.message,
                    uploading: false,
                });
            });
        }
    }

    handleUpdate = () => {
        const {
            deps: {
                photoActions,
                photoStore: {
                    editedPhoto,
                },
            },
        } = this.props;
        const {
            description,
            title,
        } = this.state;
        if (editedPhoto) {
            const {iid} = editedPhoto;
            this.setState({ uploading: true });
            photoActions.patchPhoto(title, description, iid)
            .catch(err => {
                this.setState({
                    error: err.message,
                    uploading: false,
                });
            });
        }
    }

    handleDelete = () => {
        const {
            deps: {
                photoActions,
                photoStore: {
                    editedPhoto,
                },
            },
        } = this.props;
        if (editedPhoto) {
            const {iid} = editedPhoto;
            this.setState({ uploading: true });
            photoActions.deletePhoto(iid)
            .catch(err => {
                this.setState({
                    error: err.message,
                    uploading: false,
                });
            });
        }
    }

    render() {
        const {
            description,
            error,
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
        const blockSave = !description || !(file || Boolean(editedPhoto)) || !title;
        const headerText = (editedPhoto ? 'Edit ' : 'Add ') + 'Photo';
        const actions: IFooterActionType[] = [
            {
                action: this.handleCancel,
                disabled: false,
                label: 'Cancel',
                type: EBtnType.SECONDARY,
            }, {
                action: editedPhoto ? this.handleUpdate : this.handleSave,
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
                        label='Title'
                        type={EInputType.TEXT}
                        value={title}
                        onChange={this.handleChangeTitle}
                        expand={true}
                    />
                    <FormItem
                        label='Description'
                        type={EInputType.TEXT}
                        value={description}
                        onChange={this.handleChangeDescription}
                        expand={true}
                    />
                    {!editedPhoto && <ImageLoader
                        onChange={this.handleFileChange}
                        url=''
                    />}
                    {editedPhoto && (
                        <div style={deleteWrapperStyle}>
                            <Btn
                                action={this.handleDelete}
                                label={'Delete'}
                                type={EBtnType.WARNING}
                            />
                        </div>
                    )}
                    {error}
                </div>
                <ModalFooter actions={actions}/>
            </ModalWrapper>
        );
    }
}
