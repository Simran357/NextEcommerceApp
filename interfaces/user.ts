export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
}

export interface AuthFormProps {
  title: string;
  buttonText: string;
  onSubmit: (email: string, password: string) => void;

  changeForm: () => void;
}

export interface navbar {
  search: string;
  setSearch: (value: string) => void;

  setShowLogin: (value: boolean) => void;
  setShowSignup: (value: boolean) => void;
}

