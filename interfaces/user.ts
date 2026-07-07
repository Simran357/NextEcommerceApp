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
}
