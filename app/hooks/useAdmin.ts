import { useAuth } from "@/components/context/authContext";

export default function useAdmin() {
    const { role } = useAuth();

    return role === "admin";
}