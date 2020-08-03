export const functions = {
        url: process.env.VUE_APP_FUNCTIONS_URL || 'http://localhost:5001/team-vudu/us-central1',
        secret: 'test-secret'
}

export const prisma = {
        http: 'https://eu1.prisma.sh/ernest-hayford-4ed24c/Consol/dev',
        ws: 'wss://eu1.prisma.sh/ernest-hayford-4ed24c/Consol/dev'
}