import React from 'react';
import { Badge, Col, Descriptions, Row, Steps } from 'antd';
import type { DescriptionsProps } from 'antd';

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Product',
    children: 'Cloud Database',
  },
  {
    key: '2',
    label: 'Billing Mode',
    children: 'Prepaid',
  },
  {
    key: '3',
    label: 'Automatic Renewal',
    children: 'YES',
  },
  {
    key: '4',
    label: 'Order time',
    children: '2018-04-24 18:00:00',
  },
  {
    key: '5',
    label: 'Usage Time',
    children: '2019-04-24 18:00:00',
    span: 2,
  },
  {
    key: '6',
    label: 'Status',
    children: <Badge status="processing" text="Running" />,
    span: 3,
  },
  {
    key: '7',
    label: 'Negotiated Amount',
    children: '$80.00',
  },
  {
    key: '8',
    label: 'Discount',
    children: '$20.00',
  },
  {
    key: '9',
    label: 'Official Receipts',
    children: '$60.00',
  },
  {
    key: '10',
    label: 'Config Info',
    children: (
      <>
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1
        <br />
      </>
    ),
  },
];

const StoredList: React.FC = () => {

  return(
    <>
      <Row>
        <Col span={3} push={1}>
          <Steps
            direction="vertical"
            current={1}
            items={[
              {
                title: 'Finished',
                description: desc,
              },
              {
                title: 'Finished',
                description: desc,
              },
              {
                title: 'Finished',
                description: desc,
              }
            ]}
          />
        </Col>
        <Col span={25} push={2}>
          <Descriptions bordered items={items} />
        </Col>
      </Row>
    </>
  )
}

const desc: React.ReactNode = (
  <div>
      test
  </div>
);

export default StoredList;