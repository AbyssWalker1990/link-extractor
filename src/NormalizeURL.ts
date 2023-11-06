class NormalizeURL {
    public handle(url: string): string {
        const urlObj = new URL(url)
        const hostPath = `${urlObj.hostname}${urlObj.pathname}`
        if (hostPath.length > 0 && hostPath.endsWith('/')) {
            return hostPath.slice(0, -1)
        }
        return hostPath
    }
}

export default NormalizeURL
