export default function AuthLayout({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
    return (
        <div className="h-screen flex justify-center items-center">
            {children}
        </div>
    );
}
