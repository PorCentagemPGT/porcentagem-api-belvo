/**
 * Interface para o cliente Belvo
 */
export interface BelvoClient {
  connect(): Promise<void>;
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
