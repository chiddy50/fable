import { auth } from "@/auth";


export default async function SettingsPage() {
    const session = await auth();
    
    return (
        <div>
            <h1>Settings Page</h1>
            <div>Session: {JSON.stringify(session)}</div>
        </div>
    );
}
