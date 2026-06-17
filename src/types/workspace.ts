export type workspace_info = {
  id: string;
  title: string;
  icon?: string;
  extensions: string[];
  path: string;
};

export type create_workspace_input = {
  id: string;
  title: string;
};
