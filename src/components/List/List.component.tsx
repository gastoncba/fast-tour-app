import { useState } from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';

interface ListItem {
    title: string;
    icon?: React.ReactNode;
    onClick: (value?: any) => void
  }

  interface Props {
    items: ListItem[];
  }
  
export const List: React.FC<Props> = ({ items }) => {

    const [activeItemIndex, setActiveItemIndex] = useState(0);

    const handleItemClick = (index: number, item: ListItem) => {
        setActiveItemIndex(index);
        item.onClick()
    };

    return (
      <Menu selectedKeys={[activeItemIndex.toString()]} mode="inline">
        {items.map((item, index) => (
          <Menu.Item key={index} icon={item.icon || <AppstoreOutlined />} onClick={() => handleItemClick(index, item)}>
            {item.title}
          </Menu.Item>
        ))}
      </Menu>
    );
  };
  