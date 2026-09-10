import postgres from 'postgres';
export default async function handler(req,res){
  const url=process.env.DATABASE_URL||process.env.POSTGRES_URL||process.env.NEON_DATABASE_URL;
  if(!url)return res.status(200).json({persistent:false,message:'Database not configured',projects:[],tasks:[],subtasks:[]});
  const sql=postgres(url,{max:1,ssl:'require'});
  try{const [projects,tasks,subtasks]=await Promise.all([sql`select * from projects order by id`,sql`select * from tasks order by project_id,id`,sql`select * from subtasks order by task_id,id`]);res.status(200).json({persistent:true,projects,tasks,subtasks})}
  catch(e){res.status(500).json({error:'Database unavailable'})}finally{await sql.end({timeout:2})}
}
