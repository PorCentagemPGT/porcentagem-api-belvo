/**
 * Interface para o cliente Belvo
 */
export interface BelvoTransaction {
  id: string;
  account: string;
  link: string;
  amount: number;
  balance: number;
  status: string;
  type: string;
  category: {
    primary: string;
    detailed: string;
  };
  description: string;
  createdAt: string;
  collectedAt: string;
  currency: string;
  reference: string;
}

export interface BelvoAccount {
  id: string;
  link: string;
  institution: string;
  category: string;
  type: string;
  number: string;
  name: string;
  currency: string;
  publicIdentification?: {
    type: string;
    value: string;
  };
  balance: {
    current: number;
    available: number;
  };
  collectedAt: string;
  createdAt: string;
  lastAccessedAt: string;
}

export interface BelvoClient {
  connect(): Promise<void>;
  accounts: {
    list(params: { link: string }): Promise<BelvoAccount[]>;
  };
  transactions: {
    list(params: {
      limit?: number;
      filters: {
        link: string;
        date_from?: string;
        date_to?: string;
      };
    }): Promise<BelvoTransaction[]>;
  };
  widgetToken: {
    create(): Promise<BelvoWidgetToken>;
  };
}

/**
 * Interface para a configuração do Belvo
 */
export interface BelvoConfig {
  id: string;
  password: string;
  environment: string;
}

/**
 * Interface para o token do widget Belvo
 */
export interface BelvoWidgetToken {
  access: string;
  refresh?: string;
}

/**
 * Interface para erro da API Belvo
 */
export interface BelvoApiError {
  statusCode: number;
  response?: {
    status: number;
    data?: {
      detail?: string;
      code?: string;
    };
  };
  message?: string;
}
