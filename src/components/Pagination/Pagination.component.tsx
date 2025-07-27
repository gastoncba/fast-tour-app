import { Pagination as AntPagination } from 'antd';
import { PaginatedResponse } from '../../models/Pagination.model';

interface PaginationProps<T> {
  data: PaginatedResponse<T>;
  onPageChange: (page: number) => void;
  loading?: boolean;
  showQuickJumper?: boolean;
  showTotal?: boolean;
}

export const Pagination = <T extends any>({
  data,
  onPageChange,
  loading = false,
  showQuickJumper = true,
  showTotal = true,
}: PaginationProps<T>) => {
  const { page, totalItems } = data;

  const handlePageChange = (page: number) => {
    onPageChange(page);
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
        pageSize={5}
        onChange={handlePageChange}
        showQuickJumper={showQuickJumper}
        showTotal={showTotal ? showTotalText : undefined}
        disabled={loading}
        size="default"
        responsive={true}
      />
    </div>
  );
};
