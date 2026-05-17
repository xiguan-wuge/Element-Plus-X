export interface SearchResult {
  id: string;
  title: string;
  content: string;
  source?: string;
  timestamp?: Date;
  fileType?: string;
  fileSize?: number;
  filePath?: string;
  relevanceScore?: number;
  customProps?: Record<string, any>;
}

export interface AISearchProps {
  // 基础属性
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
  clearable?: boolean;
  results?: SearchResult[];
  maxHeight?: string;

  // 展示形态
  displayMode?: 'dropdown' | 'flat'; // dropdown: 下拉模式, flat: 平铺模式

  // 文件选择相关
  allowFileUpload?: boolean;
  acceptFileTypes?: string;
  maxFileSize?: number;
  maxFileCount?: number;

  // 样式相关
  resultMaxWidth?: string;
  inputWidth?: string;
  inputStyle?: string | CSSProperties | CSSProperties[] | string[];

  // 高级功能
  autoFocus?: boolean;
  debounceTime?: number;
  minSearchLength?: number;
}

export interface AISearchInstance {
  focus: () => void;
  clear: () => void;
  setLoading: (loading: boolean) => void;
  updateResults: (results: SearchResult[]) => void;
  scrollToTop: () => void;
  scrollToBottom: () => void;
}
