export interface Profile {
  name: string;
  pfpUrl: string;
  account: {
    label: string;
    url: string;
  };
  display: {
    label: string;
    url: string;
  };
  logout: string;
}
