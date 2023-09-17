import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="Loading">
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 50 }} />}
        size="large"
      />
    </div>
  );
}
