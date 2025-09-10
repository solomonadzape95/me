import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

async function uploadImage(file:File, folder:string){
    const {data,error} =  await supabase.storage.from("project-images").upload(`${folder}/${file.name}`, file, {upsert: true}
    )
    return {data,error}    
}