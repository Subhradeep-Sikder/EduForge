import MaxMidthWrapper from "@/components/common/MaxMidthWrapper";
import Dashboard from "@/components/Dashboard";
import prisma from "@/lib/prisma";


import { auth } from "@clerk/nextjs/server";





const Page = async () => {

    try{
        const dbUser = await syncCurrentUser();
        if(!dbUser){
            redirect("/");
        }

    }catch(error){
        console.error("Error fetching user data:", error);
        redirect("/");
    }
    //---------------------------------------------------------------------------

   const { userId } = await auth();

    const userData = await prisma.user.findFirst({
        where:{
            clerkUserId: userId,
        },select:{
            lessonPlans:true
        }
    });

    if(!userData){
        redirect("/");
    }

    return (
        <MaxMidthWrapper className=" py-8 md:py-20">
            <Dashboard lessonPlans={userData.lessonPlans}/>
        </MaxMidthWrapper>
    )
}

export default Page