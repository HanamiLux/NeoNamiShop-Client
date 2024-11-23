export class UserUtils {
    static getUserId(): string | null {
        const userId = localStorage.getItem('userId');
        if (!userId || !/^[0-9a-fA-F-]{36}$/.test(userId)) {
            return null;
        }
        return userId;
    }
}