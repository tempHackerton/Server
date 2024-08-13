import { pool } from "../../../config/db.connect.js";



export const isNewDataDao=async(req)=>{

    const conn = await pool.getConnection();
    const dataFind= await pool.query(findDataSql,[req.name]);
    if(dataFind==1){
        conn.release();
        return false;
    }else{
        const insertData = await pool.query("insert into policies( name, type, starttime, endtime, target, description) values (?,?,?,?,?,?)",[req.name,req.type,req.startTime,req.endTIme,req.target,req.description]);
        conn.release();
        return true;
    }
}

export const sendAlarmDao=async(data,user)=>{
    const date = new Date();
    const conn = await pool.getConnection();
    const sendAlarm = await pool.query("insert into Alarm(is_read,created_at,policy_id,user_id) values (?,?,?,?);",[0,date,data,user]);
    conn.release();
}

export const readAlarmDao = async(data,user)=>{
    console.log("읽은 알림: ",data);
    const conn = await pool.getConnection();
    const readAlarmDao = await pool.query('update Alarm set is_read = 1 where id=?;',[data]);
    conn.release();
}
export const getAlarmDao=async (user) =>{
    const conn = await pool.getConnection();
    const [getAlarm] = await pool.query("select*from Alarm where user_id=? order by created_at DESC;",[user]);
    conn.release();
    return getAlarm;
}
export const getPoliciesDao = async(policies)=>{
    console.log("12",policies);
    const conn = await pool.getConnection();
    const getPolicy =await pool.query("select*from policies where id=?",[policies]);
    conn.release();
    console.log(getPolicy[0]);

    return getPolicy
}