import { Pagination as AntPagination } from 'antd';
import { PaginatedResponse } from '../../models/Pagination.model';

interface PaginationProps<T> {
  data: PaginatedResponse<T>;
  onPageChange: (page: number, pageSize: number) => void;
  loading?: boolean;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: boolean;
}

export const Pagination = <T extends any>({
  data,
  onPageChange,
  loading = false,
  showSizeChanger = true,
  showQuickJumper = true,
  showTotal = true,
}: PaginationProps<T>) => {
  const { page, totalItems, totalPages } = data;

  const handlePageChange = (page: number, pageSize: number) => {
    onPageChange(page, pageSize);
  };

  const showTotalText = (total: number, range: [number, number]) => {
    return `${range[0]}-${range[1]} de ${total} elementos`;
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: '20px 0',
      marginTop: '20px'
    }}>
      <AntPagination
        current={page}
        total={totalItems}
        pageSize={data.items.length > 0 ? Math.ceil(totalItems / totalPages) : 10}
        onChange={handlePageChange}
        onShowSizeChange={handlePageChange}
        showSizeChanger={showSizeChanger}
        showQuickJumper={showQuickJumper}
        showTotal={showTotal ? showTotalText : undefined}
        disabled={loading}
        size="default"
        responsive={true}
      />
    </div>
  );
};
