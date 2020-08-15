const admin = require('firebase-admin')
const { prisma } = require('../generated/prisma-client')

module.exports = {
    createUser: async (req, res)=>{
        try{
            let userData = req.body
            console.log(userData)
            // Create Firebase User
            let createdUser = await admin.auth().createUser({
                email: userData.email,
                emailVerified: false,
                password: userData.password,
                displayName: `${userData.first_name} ${userData.last_name}`,
                disabled: false
            })

            // Store created firebase User ID with first name and last name
            await prisma.createAuth({
                firebase_id: createdUser.uid,
                account_type: userData.account_type,
                details: {
                    create: {
                        email: createdUser.email,
                        first_name: userData.first_name,
                        last_name: userData.last_name
                    }
                }
            })

            res.json({
                message: 'user created successfully'
            })
        }catch (e) {
            console.error(e)
            res.status(500).json(e)
        }
    }
}