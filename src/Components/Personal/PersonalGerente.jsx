import Personal from "./Personal";

export const PersonalGerente = () => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    return (
        <Personal token={token} userRole={userRole} />
    );
}