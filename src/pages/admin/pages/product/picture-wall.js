import React, { PureComponent } from 'react'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { reDeleteImg } from '@/services'
import { BASE_IMG_URL } from '@/utils/constants';
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
export default class PicturesWall extends PureComponent {

    constructor(props) {
        super(props)
        let fileList = []
        const { imgs } = this.props
        if(imgs && imgs.length>0){
            fileList=imgs.map((img,index)=>({
                uid:-index,
                name:img,
                status:'done',
                url:BASE_IMG_URL+img
            }))
        }
        this.state = {
            previewVisible: false,
            previewImage: '',
            previewTitle: '',
            fileList //所有上传图片的数组
        };

    }
    //获取所有已经上传图片文件名数组
    getImgs = () => {
        return this.state.fileList.map(file => file.name)
    }
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {// 指定file对应的大图
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };
    /*
    file 当前操作文件 跟filelist最后一个对象相等,但是不是同一个对象
    fileList 所有上传图片对象的数组
    */
    handleChange = async ({ file, fileList }) => {
        //上传删除过程中 更新filelist状态 filelist已经上传对象的数组
        // 上传成功 修正 name, url
        if (file.status === 'done') {
            const result = file.response
            if (result.status === 0) {
                message.success('上传图片成功!')
                const { name, url } = result.data
                file = fileList[fileList.length - 1]
                file.name = name
                file.url = url
            } else {
                message('上传图片失败!')
            }
        } else if (file.status === 'removed') { //删除图片
            const result = (await reDeleteImg(file.name)).data
            console.log(result);
            if (result.status === 0) {
                message.success('删除图片成功')
            } else {
                message.error('删除图片失败')
            }
        }

        this.setState({ fileList });
    }

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <>
                <Upload
                    action={BASE_IMG_URL} //上传图片接口地址
                    accept='image/*'//只接受图片格式
                    name='image'//请求参数名
                    listType="picture-card" //卡片格式
                    fileList={fileList} //已经上传图片文件对象的数组
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 4 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </>
        );
    }
}