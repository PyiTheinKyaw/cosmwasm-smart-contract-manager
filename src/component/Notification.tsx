import React, { useEffect } from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Button, notification } from 'antd';

interface NotificationsProps {
    message: string,
    description: string
}

const Notifactions: React.FC<NotificationsProps> = ({message, description}) => {
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        const openNotification = () => {
            api.open({
                message: message,
                description: description,
                icon: <SmileOutlined style={{ color: '#108ee9' }} />,
            });
        };

        openNotification();
    }, []);


    return (
        <>
            {contextHolder}
        </>
    );
};

export default Notifactions;