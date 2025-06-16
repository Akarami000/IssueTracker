import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getUser = async(req, res)=>{

   const userId = req.user.id;
   try{
    const user = await prisma.user.findUnique({
        where: {id: userId},
        select:{id: true, name: true, email: true, createdAt: true, updatedAt: true}
    });
    res.json({
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }})
        console.log('User profile fetched successfully:', user);
   }
   catch(err){
    console.log('Error fetching user profile:', err);
    return res.status(500).json({ error: 'Failed to fetch user profile' });
   }
}

export const updateUser = async(req,res)=>{
    const userId = req.user.id;
    const {name,email} = req.body;
    try{
        const user = await prisma.user.update({
            where: {id: userId},
            data:{name, email},
            select:{id: true, name: true, email: true, createdAt: true, updatedAt: true}    
        })
        res.json({
            user:{
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        })
    }catch(err){
        console.log('Error updating user profile:', err);
        return res.status(500).json({ error: 'Failed to update user profile' });
    }
}