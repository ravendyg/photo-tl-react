import * as React from 'react';

const wrapperStyle = {

};

function createPreviewStyle(url: string, base64: string) {
    return {
        height: '15rem',
        backgroundImage: `url("${base64 || url || '/assets/noimage.png'}")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        margin: '1rem',
    };
};

const inputStyle = {
    visibility: 'none',
    width: '0',
    height: '0',
};

interface IImageLoaderProps {
    url: string;
    onChange: (file: File) => void;
}

interface IImageLoaderState {
    fileName: string;
    base64: string;
}

export class ImageLoader extends React.PureComponent<IImageLoaderProps, IImageLoaderState> {
    inputNode: HTMLInputElement | null = null;

    constructor(props: IImageLoaderProps) {
        super(props);
        this.state = {
            base64: '',
            fileName: '',
        };
    }

    componentWillUnmount() {
        if (this.inputNode) {
            this.inputNode.removeEventListener('change', this.selectFile);
            this.inputNode = null;
        }
    }

    openSelect = () => {
        if (this.inputNode) {
            this.inputNode.click();
        }
    }

    setInputNode = (el: HTMLInputElement | null) => {
        if (!this.inputNode && el) {
            this.inputNode = el;
            this.inputNode.addEventListener('change', this.selectFile);
        }
    }

    selectFile = () => {
        if (this.inputNode && this.inputNode.files && this.inputNode.files.length > 0) {
            const file = this.inputNode.files[0];
            const reader = new FileReader();
            reader.onload = ({target}) => {
                this.props.onChange(file);
                if (target) {
                    const base64 = (target as any).result as string;
                    this.setState({
                        base64,
                        fileName: file.name,
                    });
                }
            };
            reader.readAsDataURL(file);
        }
    }

    render() {
        const {url} = this.props;
        const {fileName, base64} = this.state;
        const source = url || fileName;

        return (
            <div className='loader-wrapper'>
                <div
                    className='image-preview'
                    onClick={this.openSelect}
                    style={createPreviewStyle(url, base64)}
                />
                <input type='file' style={inputStyle} ref={this.setInputNode}/>
                {source && <div>{source}</div>}
            </div>
        );
    }
}
