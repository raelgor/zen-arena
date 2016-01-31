module.exports = {
    
    // Number of clusters
    // to use
    numOfClusters: 4,
    
    // Bind info
    address: 'localhost',
    port: 8080,
    
    // App domain name
    domain: 'zenarena.com',
    
    // Default protocol
    protocol: 'https',
    
    // Use x-forwarded-for header instead of
    // remoteAddress
    xfwd: true,
    
    // Non-user namespaces
    reservedNamespaces: [
        'about',
        'terms-of-service',
        'privacy-policy',
        'contact'
    ],
    
    // MongoDB
    mongodb: {
        dbName: 'zenarena',
        dbUser: 'spdfrkpl2',
        dbPassword: 'speedfreakpl2',
        dbHost: ['zenarena.com'],
        query: {
            authSource: 'admin'
        }
    }
    
};