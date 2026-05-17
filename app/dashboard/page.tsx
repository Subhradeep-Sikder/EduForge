import MaxWidthWrapper from "@/components/common/MaxMidthWrapper";
import prisma from "@/lib/prisma";
import { syncCurrentUser } from "@/lib/sync-user";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";



const Page = async () => {

    //pushing user data to the database and fetching it for use in the dashboard
    try{
        const dbUser = await syncCurrentUser();
        if(!dbUser){
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

    }catch(error){
        console.error("Error fetching user data:", error);
        return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });      
    }
    //



    

    return (
        <MaxWidthWrapper>
            <h1>Dashboard</h1>
        </MaxWidthWrapper>

    )
}

export default Page